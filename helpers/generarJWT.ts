import jwt from 'jsonwebtoken';

export const generarJWT = (id = '') => {

    return new Promise(( resolve, reject ) => {

        const payload = { id };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY as string, {
            expiresIn: '4h'
        }, (err, token) => {

            if( err ){
                console.log(err)
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })

}