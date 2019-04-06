const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const slug = require('slug');
const fs = require('fs');
const uploadDir = ('./public/uploads');
require('dotenv').config({
    path: 'process.env'
});

exports.catchErrors = (fn) => {
    return function(req, res, next) {
      return fn(req, res, next).catch(next);
    };
  };

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});


const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if (isPhoto) {
            next(null, true);
        } else {
            next({
                message: 'that filetype isn\'t allowed!'
            }, false);
        }
    }
};


//test schema

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    descriptionFR: {
        type: String,
    },
    descriptionENG: String,
    slug: String,
    photoCover: {
        type: String,
        required: true
    },
    slider: Array,
    tags: String
});

albumSchema.pre('save', function (next) {
    this.slug = slug(this.title);
    next();
})

var Album = mongoose.model("Album", albumSchema);


// function for routing

exports.homePage = (req, res) => {
    res.render('index');
};
exports.about = (req, res) => {
    res.render('about');
}
exports.contact = (req, res) => {
    res.render('contact');
}
exports.addAlbum = (req, res) => {
    res.render('editAlbum')
};
exports.video = (req, res) => {
    res.render('video');
}
exports.editingAlbumPage = async (req, res) => {
    const albums = await Album.find();
    res.render('albumsDisplayEdit', {
        albums
    });
}

// router.post
exports.createAlbum = async (req, res) => {
    const album = await (new Album(req.body)).save();
    res.redirect(`/album/${album.slug}`);
}

exports.updateAlbum = async (req, res) => {
    const album = await Album.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true
    }).exec();
    res.redirect(`/album/${album._id}/edit`);
}

exports.upload = multer(multerOptions).fields([{
    name: 'photoCover'
}, {
    name: 'slider'
}]);

exports.resize = async (req, res, next) => {
    if (!req.files) {
        next(); //skip to next middleware if no photo
        return;
    }

    // for photoCover
    for (i in req.files['photoCover']) {
        const extension = req.files['photoCover'][i].mimetype.split('/')[1];
        req.body.photoCover = `${uuid.v4()}.${extension}`;

        const photoCover = await jimp.read(req.files['photoCover'][0].buffer);
        await photoCover.resize(800, jimp.AUTO);
        await photoCover.write(`./public/uploads/${req.body.photoCover}`);
    }


    //for slider

    req.body.slider = [];
    for (i in req.files['slider']) {
        let extensions = req.files['slider'][i].mimetype.split('/')[1];
        let extensionPath = `${uuid.v4()}.${extensions}`;
        req.body.slider.push(extensionPath);

        //resize

        let slider = await jimp.read(req.files['slider'][i].buffer);
        await slider.resize(800, jimp.AUTO);
        await slider.write(`./public/uploads/${extensionPath}`);

    }

    next();

}

//router.get
exports.getAlbums = async (req, res) => {
    const albums = await Album.find().sort({_id:-1});
    res.render('albums', {
        albums
    });
}

exports.getAlbumBySlug = async (req, res, next) => {
    const album = await Album.findOne({
        slug: req.params.slug
    });
    if (!album) return next();
    res.render('album', {
        album
    })

}

exports.editAlbum = async (req, res) => {
    const album = await Album.findOne({
        _id: req.params.id
    });
    res.render('editAlbum', {
        album
    });
}