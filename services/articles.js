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
    const result = await pool.query(
      `INSERT INTO Article 
      (title, authorNom, authorPrenom, content) 
      VALUES 
      ('${article.title}', '${article.authorNom}', '${article.authorPrenom}', '${article.content}')`
    );
    let message = 'Error in article';
  
    if (result.affectedRows) {
      message = 'Article created successfully';
    }
  
    return {message};
  }

  async function update(id, article){
    const result = await pool.query(
      `UPDATE Article 
      SET title="${article.title}", authorNom="${article.authorNom}", authorPrenom="${article.authorPrenom}", 
      content="${article.content}" 
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating article';
  
    if (result.affectedRows) {
      message = 'Article updated successfully';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await pool.query(
      `DELETE FROM Article WHERE id=${id}`
    );
  
    let message = 'Error in deleting article';
  
    if (result.affectedRows) {
      message = 'Article deleted successfully';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create,
  update,
  remove
}