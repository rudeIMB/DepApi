const {pool} = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await pool.query(
    `SELECT id, title, authorNom, authorPrenom, content 
    FROM Article LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(article){
    console.log(article.authorNom);
    try{
    const result = await pool.query(
      `INSERT INTO Article 
      (title, authorNom, authorPrenom, content) 
      VALUES 
      ('${article.title}', '${article.authorNom}', '${article.authorPrenom}', '${article.content}')`
    );
      msg = "New row added";
    return {msg};
    }  catch (err) {
  return{err};
  }
  
  }

  async function update(id, article){
    try{
    const result = await pool.query(
      `UPDATE Article 
      SET title="${article.title}", authorNom="${article.authorNom}", authorPrenom="${article.authorPrenom}", 
      content="${article.content}" 
      WHERE id=${id}` 
    );
    msg = "Row updated";
    return {msg};
    }catch (err) {
  return{err};
  }
  }

  async function remove(id){
    try{
    const result = await pool.query(
      `DELETE FROM Article WHERE id=${id}`
    );
      msg = "Row deleted";
    return {msg};
    } catch (err) {
  return{err};
  }

  }

module.exports = {
  getMultiple,
  create,
  update,
  remove
}
