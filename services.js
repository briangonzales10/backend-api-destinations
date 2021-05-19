function generateID(){

    let id = ""
    for (let i = 0; i < 10; i++) {
    
        const rand = Math.floor(Math.random() * 10)
        id += rand
    }
   return id
}

exports.generateID = generateID