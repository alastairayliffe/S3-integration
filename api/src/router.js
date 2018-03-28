import {version} from '../package.json';
import path from 'path';

class AppRouter {

    constructor(app){
        this.app = app;
        this.setUpRouters();
    }

    setUpRouters(){

        const app = this.app;
        
        // rout routing
        app.get('/', (req, res, next) =>{
            return res.status(200).json({
                version: version
            });
        });

        const upload = app.upload; 


        app.post('/api/upload', upload.array('files'), (req, res, next) => {
            console.log("Received file uploaded", req.files);

            const file =  req.files;
            return res.json({
                file: file
            });
        });

        app.get('/api/download/:name', (req, res, next)=> {
            const fileName = req.params.name;
            const filePath =  path.join(uploadDir, fileName);

            return res.download(filePath, fileName, (err) => {
                if(err) {
                    return res.status(404).json({
                        error: {
                            message: "file not found"
                        }
                    });
                } else {
                    console.log("file is downloaded.")
                }
            });
        });
    }

}

export default AppRouter;