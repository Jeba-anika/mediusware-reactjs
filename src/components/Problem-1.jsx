import React, { useState } from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [formVal, setFormVal] = useState({
        Name: "",
        Status: ""
    })
    const [allValues, setAllValues] = useState([])
    const [activeValues, setActiveValues] = useState([])
    const [completedValues, setCompletedValues] = useState([])

    const sortArrayByStatus = (array) => {
        const activeValues = array.filter(val => val.Status.toLowerCase() === 'active')
        const completedValues = array.filter(val => val.Status.toLowerCase() === 'completed')
        const otherValues = array.filter((val) => (val.Status.toLowerCase() !== 'completed' && val.Status.toLowerCase() !== 'active'))
        const sortedArray = [...activeValues, ...completedValues, ...otherValues]
        return sortedArray
    }

    const handleFormValue = (e) => {
        e.preventDefault()
        const temp = [...allValues]
        temp.push(formVal)
        const sortedArr = sortArrayByStatus(temp)
        setAllValues(sortedArr)
        const activeValues = temp.filter(val => val.Status.toLowerCase() === 'active')
        setActiveValues(activeValues)

        const completedValues = temp.filter(val => val.Status.toLowerCase() === 'completed')
        setCompletedValues(completedValues)
        const resetFormVal = {
            Name: "",
            Status: ""
        }
        setFormVal(resetFormVal)
    }

    const handleClick = (val) => {
        setShow(val);
        console.log(val)
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={(e) => handleFormValue(e)} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input
                                type="text" onChange={(e) => {
                                    const updatedVal = {
                                        Name: e.target.value,
                                        Status: formVal.Status
                                    }
                                    setFormVal(updatedVal)
                                }} name="Name" value={formVal.Name} className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input type="text" onChange={(e) => {
                                const updatedVal = {
                                    Name: formVal.Name,
                                    Status: e.target.value
                                }
                                setFormVal(updatedVal)
                            }} name="Status" value={formVal.Status} className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                show === 'all' ? allValues.map((val, index) => <tr key={index}>
                                    <td>{val.Name}</td>
                                    <td>{val.Status}</td>
                                </tr>)
                                    :
                                    show === 'active' ? activeValues.map((val, index) => <tr key={index}>
                                        <td>{val.Name}</td>
                                        <td>{val.Status}</td>
                                    </tr>)
                                        :
                                        completedValues.map((val, index) => <tr key={index}>
                                            <td>{val.Name}</td>
                                            <td>{val.Status}</td>
                                        </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;