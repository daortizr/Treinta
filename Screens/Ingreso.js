import React from 'react';
import { View, Text, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';

//Redux storage actions:
import { logearUsuario, verificarUsuario } from '../../storage/actions/actionsParaUsuario';

//Assets
import backgroundImage from '../../assets/images/login/login-bg.jpg'
import logo from '../../assets/images/logos/giacore-logo.png'

//Styles
import estilosDeLogin from './styles/estilosDeLogin';

//Toast
import Toast from 'react-native-toast-message'

//Firebase
// import { GoogleSignin } from 'react-native-google-signin';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore,{ firebase } from '@react-native-firebase/firestore';

import firebaseFunctions from '@react-native-firebase/functions';

const generarToken = firebaseFunctions().httpsCallable('generarToken');
const validarUsuario = firebaseFunctions().httpsCallable('validarUsuario');

class Login extends React.Component {

    navigationOptions = {
        headerMode: ''
    }

    constructor() {
        super();

        this.suscriberDeListenerDeAutenticacion = null;
        this.state = {
            usuarioLogueado: undefined, 
            verificandoUsuario: false,
            rol: undefined,
            pathFirma: undefined,
            tieneFirma: undefined,
            idUser: undefined,
        }
    }

    componentDidMount() {
        // this.activarListenerDeAutenticacion();
        this.verificarUsuarioLogueado()
        GoogleSignin.hasPlayServices({ autoResolve: true, showPlayServicesUpdateDialog: true })
        .then(() => {

        })
        .catch((err) => {
            console.log("Play services error", err.code, err.message);
        })
    }

    componentDidUpdate(prevProvs, prevState) {
        if (prevProvs.route.params !== this.props.route.params) {
            if(this.props.route.params.sinValidacion && Object.keys(this.props.route.params).length === 1){
                this.setState({
                    verificandoUsuario:false
                })
            }else{
                if (this.props.route.params) {
                    this.setState({
                        usuarioLogueado: { ...this.props.route.params }
                    }, () => this.onMicrosoftLoginSuccess());
                }
            }
            
        }
        
    }

    render() {
        if (this.props.verificandoEstadoDeUsuario || this.props.elUsuarioEstaLogeado) {
            return(
                <View>
                    <ImageBackground
                            style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', alignContent: "center" }}
                            resizeMode='cover'
                            source={backgroundImage}
                            blurRadius={0}
                        >
                        <Image
                            style={{ width: 120, height: 120, justifyContent: 'center' }}
                            resizeMode='cover'
                            source={logo}
                            blurRadius={0}
                        />
                    </ImageBackground>
                </View>
            )
        } else{
            return (
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={estilosDeLogin.imagenFondo}>
                        <ImageBackground
                            style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', alignContent: "center" }}
                            resizeMode='cover'
                            source={backgroundImage}
                            blurRadius={0}
                        >
                            <Image
                                style={{ width: 120, height: 120, justifyContent: 'center' }}
                                resizeMode='cover'
                                source={logo}
                                blurRadius={0}
                            />
                        </ImageBackground>
                    </View>
                    <View style={estilosDeLogin.tarjetaLogin}>
                        <View style={{ marginBottom: 20, width: 300 }}>
                            <Text style={{ opacity: 1, fontSize: 22, marginBottom: 12 }}>Bienvenido a <Text style={{ fontWeight: "bold" }}>GIAcoreAPP</Text></Text>
                            {this.mostratMensajeDeBienvenida()}
                        </View>
                        {this.mostrarBotonesDeLogin()}
                    </View>
                </View>
            )
        }

    }

    mostratMensajeDeBienvenida = () => {
        if(!this.state.verificandoUsuario){
            return (
                <Text style={{ opacity: 0.75, fontSize: 16 }}>Para continuar, inicie sesión con su cuenta <Text style={{ fontWeight: "bold" }}>corporativa</Text></Text>
            );
        }else{
            return (
                <Text style={{ opacity: 0.75, fontSize: 16 }}>Espere un momento...</Text>
            );
        }
    }

    mostrarBotonesDeLogin = () =>{
        if(!this.state.verificandoUsuario){
            return (
                <View style={{ flexDirection: "column", width: 300 }}>
                    <Button key="login_button_google" style={estilosDeLogin.google} labelStyle={{ fontSize: 18 }} icon="google" uppercase={false} mode="contained" onPress={() => this.onGoogleButtonPress()}>
                        Google
                    </Button>
                    <Button key="login_button_microsoft" style={estilosDeLogin.microsoft} labelStyle={{ fontSize: 18 }} icon="microsoft" uppercase={false} mode="contained" onPress={() => this.onMicrosoftButtonPress()}>
                        Microsoft
                    </Button>
                </View>
            );
        }else{
            return(
                <View  style={{ flexDirection: "column", width: 300,  justifyContent: 'center', alignItems: 'center', marginVertical: 10  }}>
                    <ActivityIndicator size="large" color="#545cd8" />
                </View>
            );
        }
    }

    onMicrosoftButtonPress = async () => {
        this.setState({
            verificandoUsuario: true
        });
        this.props.navigation.navigate('azureLogin');
    }

    onMicrosoftLoginSuccess() {
        if(this.state.usuarioLogueado){
            try {
                this.inforUsuarioBaseDeDatos(this.state.usuarioLogueado.email.toLowerCase())
                    .then(infoUsuario =>{
                        const userData = {
                            uid: this.state.usuarioLogueado.uid,
                            user: {
                                displayName: this.state.usuarioLogueado.displayName,
                                email: this.state.usuarioLogueado.email,
                                provider: this.state.usuarioLogueado.provider,
                                dominioCorporativo: infoUsuario.dominioAlQuePertenece,
                                rol: infoUsuario.rol
                            }
                        };
                        return generarToken(userData)
                    })
                    .then(responseGenerarToken => {
                        const token = responseGenerarToken.data.token;
                        return auth().signInWithCustomToken(token);
                    })
                    .then(async responseFirebaseAuth => {
                        const firebaseToken = await firebase.auth().currentUser.getIdToken(true);
                        return validarUsuario({
                            "email": this.state.usuarioLogueado.email.toLowerCase(),
                            "token": firebaseToken,
                            "isLogin": true
                        });
                    })
                    .then(async responseValidarUsuario => {
                        const infoUsuario = await this.inforUsuarioBaseDeDatos(this.state.usuarioLogueado.email.toLowerCase())
                        this.setState(prevState=>({
                            usuarioLogueado: {
                                ...prevState.usuarioLogueado,
                                idUser: infoUsuario.idUser,
                                rol: infoUsuario.rol,
                                pathFirma: infoUsuario.pathFirma,
                                tieneFirma: infoUsuario.tieneFirma,
                                fechaActualizacionFirma: infoUsuario.fechaActualizacionFirma,
                            }
                        }))
                        if (responseValidarUsuario.data.status === "USUARIO_ACTIVO" || responseValidarUsuario.data.status === "USUARIO_YA_LOGEADO") {
                            this.cambiarUsuarioActivoEnAplicacion(this.state.usuarioLogueado);
                        }
                        else {
                            auth().signOut();
                            Toast.show({type: "error", text1: 'Oops!', text2: 'No es posible iniciar sesión',})
                            this.setState({ verificandoUsuario: false });
                        }
                    })
                    .catch(e => {
                        console.log('Error Firebase', e);
                        this.setState({
                            verificandoUsuario: false
                        })
                        Toast.show({type: "error", text1: 'Oops!', text2: 'No es posible iniciar sesión',})
                    })
            } catch (e) {
                console.log('Error firebase catch', e);
                this.setState({
                    verificandoUsuario: false
                });
                Toast.show({type: "error", text1: 'Oops!', text2: 'No es posible iniciar sesión',})
            }
        }
    }

    onGoogleButtonPress = async () => {
        this.setState({
            verificandoUsuario: true
        });
        // Get the users ID token
        try {
            GoogleSignin.configure({
                webClientId: '892856216323-1er5gmh62sblgt4n7jhciukbjj6tmmgr.apps.googleusercontent.com',
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            let idToken = userInfo['idToken']
            if (idToken) {
                // Create a Google credential with the token
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
                // Sign-in the user with the credential
                auth().signInWithCredential(googleCredential)
                .then(async responseFirebaseAuth => {
                    const firebaseToken = await firebase.auth().currentUser.getIdToken(true);
                    return validarUsuario({
                        "email": userInfo["user"]["email"],
                        "token": firebaseToken,
                        "isLogin": true
                    });
                })
                .then(async responseValidarUsuario => {
                    const infoUsuario = await this.inforUsuarioBaseDeDatos(userInfo["user"]["email"])
                    let usuarioActivo = {
                        photoURL: "",
                        email: userInfo["user"]["email"],
                        displayName: userInfo["user"]["name"],
                        dominioCorporativo: responseValidarUsuario["data"]["dominioCorporativo"] ,
                        provider: "google.com",
                        idUser:infoUsuario.idUser,
                        rol: infoUsuario.rol,
                        pathFirma: infoUsuario.pathFirma,
                        tieneFirma: infoUsuario.tieneFirma,
                        fechaActualizacionFirma: infoUsuario.fechaActualizacionFirma,
                    }
                    if (responseValidarUsuario.data.status === "USUARIO_ACTIVO" || responseValidarUsuario.data.status === "USUARIO_YA_LOGEADO") {
                        this.cambiarUsuarioActivoEnAplicacion(usuarioActivo);
                    }
                    else {
                        auth().signOut();
                    }
                })
                .catch(e => {
                    console.log('Error Firebase', e);
                    this.setState({
                        verificandoUsuario: false
                    });
                })
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('Error cancelled', error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Error in_progress', error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Error play services not available', error);
            } else {
                console.log('Error others', error);
            }
            this.setState({
                verificandoUsuario: false
            });
        }
        
    }

    cambiarUsuarioActivoEnAplicacion = (usuario) => {
        let usuarioActivo = { ...usuario };
        this.props.logearUsuario(usuarioActivo);
    }

    //Métodos operativos:
    activarListenerDeAutenticacion = () => {
        this.suscriberDeListenerDeAutenticacion = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.validarAutenticacionDeUsuario(user);
            }
            else {
                this.setState({ mostrarContenidoDeLogin: true });
            }
        })
    }

    
    //Métodos operativos:
    verificarUsuarioLogueado = async () => {
            if(auth().currentUser){
                //const usuarioActual = auth().currentUser.providerData[0];
                const usuarioActual = await auth().currentUser.getIdTokenResult();
                ///getIdTokenResult no funciona sin internet??
                let usuarioLogueado = {};
                //if(usuarioActual.providerId === 'google.com'){
                if(usuarioActual.claims.providerId === 'google.com'){
                    const infoUsuario = await this.inforUsuarioBaseDeDatos(usuarioActual.claims.email.toLowerCase())
                    usuarioLogueado = {
                        uid: usuarioActual.uid,
                        displayName: usuarioActual.displayName,
                        email: usuarioActual.email.toLowerCase(),
                        provider: usuarioActual.providerId,
                        idUser:infoUsuario.idUser,
                        rol: infoUsuario.rol,
                        pathFirma: infoUsuario.pathFirma,
                        tieneFirma: infoUsuario.tieneFirma,
                        fechaActualizacionFirma: infoUsuario.fechaActualizacionFirma,
                        // token: usuarioActual.,
                    }
                }else{
                    const infoUsuario = await this.inforUsuarioBaseDeDatos(usuarioActual.claims.email.toLowerCase())
                    usuarioLogueado = {
                        uid: usuarioActual.claims.user_id,
                        displayName: usuarioActual.claims.displayName,
                        email: usuarioActual.claims.email.toLowerCase(),
                        provider: usuarioActual.claims.provider,
                        token: usuarioActual.token,
                        idUser:infoUsuario.idUser,
                        rol: infoUsuario.rol,
                        pathFirma: infoUsuario.pathFirma,
                        tieneFirma: infoUsuario.tieneFirma,
                        fechaActualizacionFirma: infoUsuario.fechaActualizacionFirma,
                    }
                }
                setTimeout(() => {
                    this.props.verificarUsuario(false,true, usuarioLogueado);
                }, 1000)
            }else{
                setTimeout(() => {
                    this.props.verificarUsuario(false,false, null);
                }, 1000)
            }
    }

    //Consulta de informacion de usuario DB
    inforUsuarioBaseDeDatos = (email) => {
        return new Promise((resolve, reject) => {
            let inforusuarioDB = {}
            firestore().collection("usuarios")
                .where('correo', '==', email)
                .get()
                .then(snapShots => {
                    snapShots.forEach((snapShot) => {
                        inforusuarioDB = {
                            idUser: snapShot.id,
                            rol: snapShot.data().rol,
                            dominioAlQuePertenece: snapShot.data().dominioAlQuePertenece,
                            tieneFirma: snapShot.data().firma.tieneFirma,
                            pathFirma: snapShot.data().firma.pathStorage,
                            fechaActualizacionFirma: new Date(snapShot.data().firma.fechaActualizacionFirma.seconds * 1000),
                        }
                    })
                    resolve(inforusuarioDB)
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}

const mapStateToProps = state => ({
    verificandoEstadoDeUsuario: state.reducerParaUsuario.verificandoEstadoDeUsuario,
    elUsuarioEstaLogeado: state.reducerParaUsuario.elUsuarioEstaLogeado,
    usuarioActivo: state.reducerParaUsuario.usuarioActivo
});

const mapDispatchToProps = dispatch => ({
    logearUsuario: usuarioTarget => dispatch(logearUsuario(usuarioTarget)),
    verificarUsuario: (verificado,estado,usuarioTarget) => dispatch(verificarUsuario(verificado,estado,usuarioTarget)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;