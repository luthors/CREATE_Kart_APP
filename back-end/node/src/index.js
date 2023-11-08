/* Arranca todo el programa, llama a la app, se inicializa el servidor localhost */
import app from './app.js'

import {PORT} from './config.js'

app.listen(PORT)
    console.log('SERVER  Corriendo el servidor http://localhost:3001/', PORT)