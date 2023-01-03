const fs = require('fs');
const PAGE_SIZE = 6
var bugs = require('../data/bugs.json')

module.exports = {
    query,
    get,
    remove,
    save,
}

function query(filterBy) {
    let fillteredBugs = bugs
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        fillteredBugs = fillteredBugs.filter(bug => regex.test(bug.title))
    }
    if (filterBy.minSeverity) {
        fillteredBugs = fillteredBugs.filter(bug => bug.severity >= +filterBy.minSeverity)
    }
    if (filterBy.pageIdx !== undefined) {
        const startIdx = filterBy.pageIdx * PAGE_SIZE
        fillteredBugs = fillteredBugs.slice(startIdx, PAGE_SIZE + startIdx)
    }
    if (filterBy.labels) {
        fillteredBugs = fillteredBugs.filter(bug => bug.labels.includes(filterBy.labels))
    }
    return Promise.resolve(fillteredBugs)
}

function get(bugId) {
    console.log('id', bugId)
    const bug = bugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('Bug not found')
    return Promise.resolve(bug)
}

function remove(bugId) {
    bugs = bugs.filter(bug => bug._id !== bugId)
    return _writeBugsToFile()
}

function save(bug) {
    if (bug._id) {
        const bugToUpdate = bugs.find(currBug => currBug._id === bug._id)
        bugToUpdate.title = bug.title
        bugToUpdate.severity = bug.severity
    } else {
        bug._id = _makeId()
        bug.createdAt = Date.now()
        bugs.push(bug)
    }
    return _writeBugsToFile().then(() => bug)
}

function _writeBugsToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(bugs, null, 2)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) return rej(err)
            res()
        })
    })
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}