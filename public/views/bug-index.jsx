import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { BugList } from '../cmps/bug-list.jsx'
import { BugFilter } from '../cmps/bug-filter.jsx';

const { useState, useEffect } = React

export function BugIndex() {

    const [bugs, setBugs] = useState([])
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())

    useEffect(() => {
        loadBugs()
    }, [filterBy])


    function loadBugs() {
        bugService.query(filterBy).then(bugs => {
            setBugs(bugs)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onRemoveBug(bugId) {
        bugService.remove(bugId)
            .then(() => {
                console.log('Deleted Succesfully!')
                const bugsToUpdate = bugs.filter(bug => bug._id !== bugId)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug removed')
            })
            .catch(err => {
                console.log('Error from onRemoveBug ->', err)
                showErrorMsg('Cannot remove bug')
            })
        }
        
        function onAddBug() {
            const bug = {
            title: prompt('Bug title?'),
            description: prompt('Bug description?'),
            severity: +prompt('Bug severity?'),
        }
        bugService.save(bug)
            .then(savedBug => {
                console.log('Added Bug', savedBug)
                setBugs([...bugs, savedBug])
                showSuccessMsg('Bug added')
            })
            .catch(err => {
                console.log('Error from onAddBug ->', err)
                showErrorMsg('Cannot add bug')
            })
        }

    function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const title = prompt('New Title?')
        const bugToSave = { ...bug, severity, title }
        bugService.save(bugToSave)
            .then(savedBug => {
                console.log('Updated Bug:', savedBug)
                const bugsToUpdate = bugs.map(currBug => (currBug._id === savedBug._id) ? savedBug : currBug)
                setBugs(bugsToUpdate)
                showSuccessMsg('Bug updated')
            })
            .catch(err => {
                console.log('Error from onEditBug ->', err)
                showErrorMsg('Cannot update bug')
            })
    }

    return (
        <main className="bug-index flex flex-column align-center justify-center">
            <h3>Bugs App</h3>
            <main>
            <BugFilter onSetFilter={onSetFilter} />
                <button className ="add-bug" onClick={onAddBug}>Add Bug ???</button>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </main>
    )


}
