import React from 'react'


export default function Alert(props) {
    let scapitalize = (word) => {
        if(word === "danger"){
            word="Error";
        }
        let lower = word.toLowerCase();
        let w = lower.charAt(0).toUpperCase() + lower.slice(1);
        return w;
    }
    return (
        <div style={{ height: "60px" }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{scapitalize(props.alert.type)}</strong>: {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    )
}
