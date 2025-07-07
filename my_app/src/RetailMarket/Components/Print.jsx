import { useRef, useState } from 'react'
import BillDetails from './BillDetail'
import ReactToPrint from "react-to-print";
const Print = () => {
    const ref = useRef(null);
    const [onInput, offInput] = useState(true);
    return (
        <>
            <div>
                <BillDetails ref={ref} input={onInput} offInput={offInput} />
            </div>
            <ReactToPrint
                onBeforeGetContent={() => {
                    offInput(false);
                    return Promise.resolve();
                }}
                trigger={() => <button style={{ backgroundColor: "white", marginLeft: "300px", width: "300px", border: "1px solid black" }} >Print this out!</button>}
                content={() => ref.current} />
        </>
    )
}

export default Print