import React, { useState, useContext } from 'react';
import User from "../data/User";
import FormCustomer from '../components/FormCustomer';
import {StorageContext} from "../contexts/StorageContext";
import Utilities from "../data/Utilities";
export default function AddCustomer(props) {

    const [form, setForm] = useState(null)

    const {setCustomerListData} = useContext(StorageContext);

    async function getCustomerList() {
        const customerList = await User.fetchCustomerList();
        setCustomerListData(customerList)
    }

    function saveData() {
        if(!Utilities.validateVatNr(form['vatNr'])) {
            console.error('Not a valid VatNr');
            return;
        }

        const url = `${User.API_URL}customers/`
        fetch(url, { headers: User.getPrivateHeaders(), method: "POST", body: JSON.stringify(form) })
            .then(res => res.json())
            .then(async data => {
                await getCustomerList();
                props.history.push(`/customer/${data.id}`)
            })
    }

    function handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
        setForm({ ...form, [name]: value })

    }

    return (
        <div>

            <FormCustomer
                handleInputChange={handleInputChange}
            />

            <button className="btn btn-success float-right" onClick={saveData}>Spara</button>
        </div>
    );
}
