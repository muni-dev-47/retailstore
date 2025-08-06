
const Input = (props) => {

    const { name, id, value, type, placeholder, handleonChange, labelName, labelClass } = props;
    return (
        <div className="form-floating mb-3">
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleonChange}
                required
                minLength={6}
                style={{ borderLeft: '4px solid #764ba2' }}
            />
            <label htmlFor={id}>
                <i className={labelClass}></i>
                {labelName}
            </label>
        </div>
    )
}

export default Input