const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
    var notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.blue.bold.inverse("Your Notes :"))
        notes.forEach(note => {
            console.log('Title: ' + chalk.green(note.title) + ', ' 
            + 'Body: '+ chalk.green(note.body))
        });
    }
    else {
        console.log(chalk.red("No notes found!"));
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatenote = notes.find((note)=>note.title == title)
    if (duplicatenote) {
        console.log(chalk.red.inverse("title already taken!"));
    }
    else {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added!"));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title != title)
    if (notes.length === notesToKeep.length) {
        console.log(chalk.red.inverse("title not found!"));
    }
    else {
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse("note removed!"));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    var note = notes.find((note) => note.title == title);
    if(note)
    {
        console.log(chalk.blue.bold.inverse("Your Note:"))
        console.log('Title: ' + chalk.green(note.title) + ', ' 
            + 'Body: '+ chalk.green(note.body))
    }
    else{
        console.log(chalk.red.inverse("note not found!"));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch (e) {
        return [];
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes
};