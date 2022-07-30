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
 const cekKeranjang =await db.keranjang.findOne({
    where : [
      {
          produk_id: req.body.produk_id
      },
      {
        session_id: req.body.session_id
      }
    ]
  })
  if(cekKeranjang.length > 0){
    const data = {
      produk_id: req.body.produk_id,
      qty: cekKeranjang.qty +1,
      session_id: req.body.session_id
    }
   await db.keranjang.update(data, {
      where: {id: cekKeranjang.id}
    }).then(result =>{
      res.send({
        code:200,
        message: 'Berahasil menambahkan keranjang'
      })
    }).catch(err =>{
      res.status(500).send({
        code:500,
        message : "Error update keranjang"
      })
    })
  }
  
  const data = {
    produk_id: req.body.produk_id,
    qty: req.body.qty,
    session_id:req.body.session_id
  }
  await db.keranjang.create(data).then(result =>{
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
  const id = req.params.id
  const qty =req.body.qty

  db.keranjang.update({qty : qty},{
    where: {id : id}
  }).then(result =>{
    if(result[0]){
      res.send({
        code:200,
        message : "Sukses Ubad data"
      })
    }else{
      res.status(422).send({
        code:422,
        message : "ada yang salah dari input"
      })
    }
  }).catch(err =>{
    res.status(500).send({
      code:500,
      message : "Error ubad data > " + err
    })
  })
}

exports.hapusDataKeranjang = async (req, res)=>{
  const id = req.params.id
  db.keranjang.destroy({where : {id :id}}).then(result => {
    res.send ({
      code:200,
      message : "Sukses hapus data"
    })
  }).catch(err =>{
    res.status(500).send({
      code :500,
      message: "Error hapus data > " + err
    })
  })
}

exports.checkout = async (req, res)=>{
  
}