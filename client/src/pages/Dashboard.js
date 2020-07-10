import React, { useState } from 'react'
import Axios from 'axios'

import { userAtom, totalQuantitySelector } from '../global/gloablState'
import { useRecoilState, useRecoilValue } from 'recoil';

const Dashboard = () => {

    const [user, setUser] = useRecoilState(userAtom);
    const totalQuantity = useRecoilValue(totalQuantitySelector);

    const [stockName, setStockName] = useState("")
    const [stockQty, setStockQty] = useState(0)
    const [stockPrice, setStockPrice] = useState(0)
    const [thisStockOwner, setThisStockOwner] = useState("")
    const [currentlyEditing, setCurrentlyEditing] = useState(null)
    const [errors, setErrors] = useState(null)

    const [newStockName, setNewStockName] = useState("")
    const [newStockQty, setNewStockQty] = useState("")
    const [newStockPrice, setNewStockPrice] = useState("")
    const [newStockOwner, setNewStockOwner] = useState("")

    const [whno, setWhno] = useState(0);

    const handleAdd = () => {
        if (stockName === "" || stockQty === 0 || stockPrice === 0 || thisStockOwner === "") {
            let temp = [];
            if (stockName === "") {
                temp.push({ msg: "Stock Name is reuired" });
            }
            if (thisStockOwner === "") {
                temp.push({ msg: "Stock Owner Name is reuired" });
            }
            if (stockPrice === 0) {
                temp.push({ msg: "Price can't be zero" });
            }
            if (stockQty === 0) {
                temp.push({ msg: "Quantity can't be zero" });
            }
            setErrors(temp);
        } else {
            Axios.post(`${process.env.REACT_APP_API_URL}/stocks/create`,
                { name: stockName, price: stockPrice, quantity: stockQty, stockOwner: thisStockOwner },
                {
                    headers: {
                        Authorization: 'Bearer ' + user.token
                    }
                }
            )
                .then(res => {
                    localStorage.setItem('user', JSON.stringify({
                        token: user.token,
                        user: res.data
                    }))
                    setUser({
                        token: user.token,
                        user: res.data
                    });
                    setErrors(null);
                })
                .catch(err => console.log(err))
        }
    }

    const removeItem = (_id) => {
        Axios.post(`${process.env.REACT_APP_API_URL}/stocks/delete`, { user: user.user, _id },
            {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            }
        )
            .then(res => {
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify({
                    token: user.token,
                    user: res.data
                }))
                setUser({
                    token: user.token,
                    user: res.data
                });
            })
            .catch(err => console.log(err))
    }

    const editItem = (_id,name,quantity,stockOwner,price) => {
        if (currentlyEditing === _id) {
            setCurrentlyEditing(null)
        } else {
            setCurrentlyEditing(_id)
            setNewStockName(name);
            setNewStockOwner(stockOwner);
            setNewStockPrice(price);
            setNewStockQty(quantity)
        }
    }

    const addWareHouseNumber = () => {
        Axios.post(`${process.env.REACT_APP_API_URL}/stocks/addwarehouse`,
            {
                user: user.user,
                warehouseNo: whno,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            }
        )
            .then(res => {
                localStorage.setItem('user', JSON.stringify({
                    token: user.token,
                    user: res.data
                }))
                setUser({
                    token: user.token,
                    user: res.data
                });
            })
            .catch(err => console.log(err))
    }

    const saveNewItem = (_id) => {
        Axios.post(`${process.env.REACT_APP_API_URL}/stocks/update`,
            {
                user: user.user,
                _id,
                name: newStockName,
                quantity: newStockQty,
                price: newStockPrice,
                stockOwner: newStockOwner,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + user.token
                }
            }
        )
            .then(res => {
                localStorage.setItem('user', JSON.stringify({
                    token: user.token,
                    user: res.data
                }))
                setUser({
                    token: user.token,
                    user: res.data
                });
            })
            .catch(err => console.log(err))
        setCurrentlyEditing(null)
    }

    return (
        <div className="Dashboard">

            <h3>Welcome {user.user.name && user.user.name}</h3>

            <h1>Your Warehouse</h1>

            <div className="warehouse-qunatity">
                {
                    !user.user.warehouseNo &&
                    <div className="set">
                        <input type="number" value={whno} onChange={(e) => setWhno(e.target.value)} />
                        <button className="rev" onClick={() => addWareHouseNumber()}>Set Quantity</button>
                    </div>
                }
                {
                    user.user.warehouseNo &&
                    <div className="display">
                        <div className="filled">{totalQuantity}</div>
                        <p>/</p>
                        <div className="total">{user.user.warehouseNo}</div>
                        {
                            (user.user.warehouseNo < totalQuantity) &&
                            <div className="error">Warehouse Getting Overloaded</div>
                        }
                    </div>
                }
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Stock Owner</th>
                        <th>Stock Name</th>
                        <th>Quantity</th>
                        <th>Price per stock</th>
                        <th>Total Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.user.stockData.length !== 0
                            ?
                            user.user.stockData.map(({ _id, name, quantity, price, stockOwner }) => {
                                if (!name) {
                                    return null;
                                } else {

                                    return (
                                        <React.Fragment key={_id}>
                                            <tr>
                                                <td>{stockOwner}</td>
                                                <td>{name}</td>
                                                <td>{quantity}</td>
                                                <td>{price}</td>
                                                <td>{quantity * price}</td>
                                                <td><button onClick={() => editItem(_id,name,quantity,stockOwner,price)}><img src={require("../assets/edit_icon.png")} alt="Edit" /></button></td>
                                                <td><button onClick={() => removeItem(_id)}><img src={require("../assets/delete_icon.png")} alt="delete" /></button></td>
                                            </tr>
                                            <tr className={currentlyEditing === _id ? "yes" : "no"}>
                                                <td><input type="text" className="stock-name-box" value={newStockOwner} onChange={(e) => setNewStockOwner(e.target.value)} /></td>
                                                <td><input type="text" className="name-box" value={newStockName} onChange={(e) => setNewStockName(e.target.value)} /></td>
                                                <td><input type="number" className="qty-box" value={newStockQty} onChange={(e) => setNewStockQty(e.target.value)} /></td>
                                                <td><input type="number" className="price-box" value={newStockPrice} onChange={(e) => setNewStockPrice(e.target.value)} /></td>
                                                <td><button className="rev save" onClick={() => saveNewItem(_id)}>Save</button></td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                }
                            })
                            : <tr><td>Stocks are empty</td></tr>
                    }
                </tbody>
            </table>

            <h3>Add new stock here</h3>
            <div className="add-form">
                <label htmlFor="stockName">Stock Owner</label>
                <input type="text" id="stockName" value={thisStockOwner} onChange={(e) => setThisStockOwner(e.target.value)} />
                <label htmlFor="stockName">Stock Name</label>
                <input type="text" id="stockName" value={stockName} onChange={(e) => setStockName(e.target.value)} />
                <label htmlFor="stockQty">Stock Quantity</label>
                <input type="number" id="stockQty" value={stockQty} onChange={(e) => setStockQty(e.target.value)} />
                <label htmlFor="stockName">Stock Price</label>
                <input type="number" id="stockName" value={stockPrice} onChange={(e) => setStockPrice(e.target.value)} />
            </div>
            <button className="add rev" onClick={() => handleAdd()}>Add</button>
            {
                errors && errors.map(({ msg }, index) => <div key={index} className="error">{msg}</div>)
            }
        </div>
    )
}

export default Dashboard
