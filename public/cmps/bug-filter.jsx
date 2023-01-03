const { useState, useEffect, useRef } = React

import { bugService } from '../services/bug.service.js'

export function BugFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(bugService.getDefaultFilter())
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="bug-filter full main-layout">
        <h2>Filter our bugs</h2>
        <form onSubmit={onSubmitFilter}>
            <div className="form-first-line">
            <label htmlFor="title">Title:</label>
            <input type="text"
                id="title"
                name="txt"
                placeholder="By title"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="minSeverity">Min Severity:</label>
            <input type="number"
                id="minSeverity"
                name="minSeverity"
                value={filterByToEdit.minSeverity}
                onChange={handleChange}
            />

            <label htmlFor="label-filter">Filter by label:</label>
            <select id="label-filter" name="labels" value={filterByToEdit.labels} onChange={handleChange}>
                <option value="">Select a label</option>
                <option value="critical">Critical</option>
                <option value="need-CR">Need CR</option>
                <option value="dev-branch">Dev Branch</option>
            </select>
            </div>
            <div className="form-second-line">
            <label htmlFor="pageIdx">Page:</label>
            <input type="number"
                id="pageIdx"
                name="pageIdx"
                placeholder="0"
                value={filterByToEdit.pageIdx}
                onChange={handleChange}
            />

            <button>Filter bugs!</button></div>
        </form>

    </section>
}