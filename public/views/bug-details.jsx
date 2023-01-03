const { useState, useEffect } = React
const { Link, useParams,Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        bugService.get(bugId)
            .then(bug => {
                setBug(bug)
            })
            .catch(err => {
                showErrorMsg('Cannot load bug')
            })
    }, [])

    if (!bug) return <h1>loadings....</h1>
    return bug && <div className="bug-details flex flex-column justify-center space-between">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <h5>{bug.description}</h5>
        <p>Severity: <span>{bug.severity}</span></p>
        <Link to="/bug">Back to List</Link>
    </div>

}
