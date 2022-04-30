const mysql = require('mysql');

const dbInfo = { 
    host: 'localhost', // 사용할 DB가 설치된 호스트의 IP
    port: '3306', // DB를 설치할 때 사용자가 지정한 포트번호. default: 3306
    user: 'root', // DB의 user이름
    password: '1234', // DB를 설치할 때 사용자가 지정한 비밀번호
    database: 'board_db' // 사용할 DB의 이름
};

module.exports = { // module.export를 통해 외부로 넘겨줌
    init: function() { 
        return mysql.createConnection(dbInfo); // 서버간의 연결 객체를 반환
    },
    connect: function(conn) {
        conn.connect(function(err) { // 연결 동작
            if(err) console.error('MySQL connection Error : ' + err);
            else console.log('MySQL is connected successfully'); 
        });
    }
}