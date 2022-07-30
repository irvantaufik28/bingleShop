const db = require("../models/bundle.model");
const Op = db.Sequelize.Op;
const func = require("../libs/function");
const { v4: uuidv4 } = require("uuid");

exports.getProdukHome = async (req, res) => {
  db.produk
    .findAll({
      attributes: ['id', 'title', 'image', 'price', 'url'],
      limit: 8,
    })
    .then((result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Data Tidak Tersedia",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find Data" + err,
      });
    });
};

exports.getProdukPage = async (req, res) => {
  let keyword = '';
  const condition = []
  if (req.query.keyword) {
    keyword = req.query.keyword
    condition.push({ title: { [Op.like]: "%" + keyword + "%" } })
  }

  db.produk.findAll({
    where: condition,
    attributes: ['id', 'title', 'image', 'price', 'url'],
  }).then((result) => {
    if (result.length > 0) {
      res.send({
        code: 200,
        message: "OK",
        data: result,
      });
    } else {
      res.status(404).send({
        code: 404,
        message: `tidak ada yang cocok pada keyword ${keyword}`
      });
    }
  }).catch((err) => {
    res.status(500).send({
      code: 500,
      message: "Error find Data >" + err
    })
  })
}


exports.getProdukDetil = async (req, res) => {
  const url = req.params.url
  db.produk.findOne({
    where: { url: url },
    attributes: ['id', 'title', 'description', 'full_description', 'price', 'image', 'url'],
    include: [
      {
        model: db.kategori,
        attributes: ['name']
      }
    ]
  }).then(result => {
    if (result) {
      res.send({
        code: 200,
        message: 'OK',
        data: result
      })
    } else {
      res.status(404).send({
        code: 400,
        message: "Produk Telah di hapus !"
      })
    }
  }).catch(err => {
    res.status(500).send({
      code: 500,
      message: 'Error retive data'
    })
  })
}

exports.getDataKeranjang = async (req, res) => {
  const session_id = req.query.session_id
  db.keranjang.findAll({
    where: { session_id: session_id },
    attributes :['id', 'qty','session_id', 'createdAt'],
    include: [
      {
        model: db.produk,
        attributes:['id', 'title', 'image', 'price', 'url']
      }
    ]
  }).then(result => {
    if (result.length > 0) {
      res.send({
        code: 200,
        message: 'OK',
        data: result
      })
    } else {
      res.status(404).send({
        code: 404,
        message: "Belum ada data di keranjang"
      })
    }
  }).catch(err => {
    res.status(500).send({
      code: 500,
      message: 'Error retrive data > ' + err
    })
  })
}

exports.tambahDataKeranjang = async (req, res )=>{
  const data = {
    produk_id: req.body.produk_id,
    qty: req.body.qty,
    session_id:req.body.session_id
  }
  db.keranjang.create(data).then(result =>{
    res.send({
      code:200,
      message: 'Berhasil menambahkan data Ke keranjang',
      data : result
    })
  }).catch(err =>{
    res.status(500).send({
      code :500,
      message: 'Error menambahkan data keranjang > '+ err 
    })
  })
}


exports.ubahDataKeranjang = async (req, res)=>{

}

exports.hapusDataKeranjang = async (req, res)=>{
  
}

exports.checkout = async (req, res)=>{
  
}