const { Link } = ReactRouterDOM

import { BugPreview } from "./bug-preview.jsx"

export function BugList({ bugs, onRemoveBug, onEditBug }) {
    return <ul className="bug-list">
        {bugs.map(bug =>
            <li key={bug._id} className="bug-preview-list" >
                <BugPreview bug={bug} />
                <div>
                    <button className="del-btn" onClick={() => { onRemoveBug(bug._id) }}>x</button>
                    <button className="edit-btn" onClick={() => { onEditBug(bug) }}>Edit</button>
                </div>
                <Link to={`/bug/${bug._id}`}>Details</Link>
            </li>)}
    </ul>
}