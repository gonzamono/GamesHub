const { body } = require('express-validator')
const path = require('path')
module.exports = [
    body('name')
        .notEmpty().withMessage('Debes escribir un nombre para el producto').bail()
        .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('description')
        .notEmpty().withMessage('Debes ingresar una descripción').bail()
        .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres'),
        body('new-img')
        .custom((value,{req}) =>{
            let file = req.file
            let acceptedExtensions = ['.jpg','.png','.jpeg','.gif']

            if(!file){
                throw new Error('El producto debe tener una imagen')
            }else{
                let fileExtension = path.extname(file.originalname)
                if(!acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
                }
            }
            return true
        }),
    body('value')
        .notEmpty().withMessage('El producto debe tener un precio').bail(),
    body('discount')
        .notEmpty().withMessage('De no tener decuento debe tener al menos un cero').bail()
        .isLength({max:2}).withMessage('El descuento no puede ser mayor a 99%'),
    body('section')
        .notEmpty().withMessage('Debe pertenecer a una sección').bail()
        .isIn(['1','2','3']).withMessage('Debe estar en una sección válida'),
    body('category')
        .notEmpty().withMessage('Debe pertenecer a una categoria').bail()
        .isIn(['1','2','3','4','5']).withMessage('Debe tener una categoria válida'),
    body('consoles')
        .notEmpty().withMessage('Debe ser compatible con al menos una consola').bail()
]