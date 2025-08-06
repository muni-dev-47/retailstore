import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { updateStackItems } from '../Redux/stackSlice';

const Stacks = () => {

  const stack = useSelector(store => store.stack.stacks);
  const [sectionInput, setSectionInput] = useState({ section: "" })
  const [searchData, setSearchData] = useState({ sectionName: "ALL", date: new Date().toISOString().split("T")[0] });
  const [search, setSearch] = useState(false);
  const [section, setSection] = useState(false);
  const [select, setselect] = useState("section");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => setSection(val => !val);
  const updateStackItem = (item, index) => {
    dispatch(updateStackItems({ index }));
    navigate(`/stack/${item.section.sectionName + "&" + index}`);
  }
  const handleFilterStacks = () => {
    return stack.filter(val =>
      select === "section"
        ? searchData.sectionName?.toUpperCase() !== "ALL"
          ? val.section.sectionName?.toLowerCase() === searchData.sectionName?.toLowerCase()
          : true
        : val.section.date?.split("T")[0] === searchData.date
    );
  };
  return (
    <div>
      {search && (
        <div className={`card mb-4`} style={{ filter: section ? 'blur(5px)' : "" }}>
          <div className="card-body p-2">
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                  placeholder="Section..."
                />
              </div>

              <div className="col-md-4">
                {select === "section" ? (
                  <input
                    type="text"
                    name="sectionName"
                    value={searchData?.sectionName || ""}
                    className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                    placeholder="Search by name or ID"
                    onChange={(e) => setSearchData(val => ({ ...val, [e.target.name]: e.target.value }))}
                  />
                ) : (
                  <input
                    type="date"
                    name="date"
                    className="form-control form-control-lg border-0 border-bottom rounded-0 shadow-none"
                    value={searchData?.date ?? new Date().toISOString().split("T")[0]}
                    onChange={(e) => setSearchData(val => ({ ...val, [e.target.name]: e.target.value }))}
                  />
                )}
              </div>

              <div className="col-md-4">
                <select
                  className="form-select form-select-lg border-0 border-bottom rounded-0 shadow-none"
                  onChange={(e) => setselect(e.target.value)}
                >
                  <option value="section">Section</option>
                  <option value="date">Date</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='d-flex justify-content-center' style={{ filter: section ? 'blur(5px)' : "" }}>
        <div className="d-flex addbillbutton">
          <div className="p-2">
            <button
              className={`btn ${section ? 'btn-danger' : 'btn-primary'} rounded-circle px-3 p-2 transition-all`}
              style={{ transform: 'scale(1)', transition: 'transform 0.2s ease' }}
              onClick={() => handleClick()}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {section ? (
                <i className="bi bi-x-circle fs-4 text-white"></i>
              ) : (
                <i className="bi bi-plus-circle fs-4 text-white"></i>
              )}
            </button>
          </div>

          <div className="p-2">
            <button
              className={`btn ${search ? 'btn-danger' : 'btn-primary'} rounded-circle px-3 p-2 transition-all`}
              style={{ transform: 'scale(1)', transition: 'transform 0.2s ease' }}
              onClick={() => setSearch(val => !val)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {search ? (
                <i className="bi bi-x-circle fs-4 text-white"></i>
              ) : (
                <i className="bi bi-search fs-4 text-white"></i>
              )}
            </button>
          </div>

        </div>
      </div>
      <div className={`card shadow-sm border-0`} style={{ filter: section ? 'blur(5px)' : "" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="bg-light">
              <tr>
                <th className="ps-4">#</th>
                <th>SECTION NAME</th>
                <th>DATE</th>
                <th className="text-center">ITEMS</th>
                <th className="text-end pe-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {handleFilterStacks()?.length > 0 ? (
                handleFilterStacks()?.map((val, index) => (
                  <tr key={index}>
                    <td className="ps-4">{index + 1}</td>
                    <td className="fw-semibold text-uppercase">{val?.section?.sectionName}</td>
                    <td>{val?.section?.date.split("T")[0]}</td>
                    <td className="text-center">
                      <span className="badge bg-primary-subtle text-primary">
                        {val?.section?.stacks?.length}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <button
                        className="btn btn-sm btn-outline-primary rounded-pill"
                        onClick={() => updateStackItem(val, index)}
                      >
                        <i className="bi bi-pencil-fill me-1"></i> Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    <i className="bi bi-inbox me-2"></i> No sections found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {section && (
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="position-absolute  bg-gradient-primary text-dark p-4 shadow rounded-4 border-0"
            style={{
              width: '500px',
              background: 'linear-gradient(135deg, rgb(247 247 247) 0%, #fff 100%)',
              animation: 'fadeIn 0.3s ease-out',
              top: "100px"
            }}
          >
            <div className="text-center mb-4">
              <h3 className="fw-bold mb-1">Enter Section Details</h3>
              <p className="text-dark-50">Please provide section information to continue</p>
            </div>

            <div className="my-4">
              <label htmlFor="sectionInput" className="form-label text-dark mb-2">Section ID/Name</label>
              <input
                id="sectionInput"
                type="text"
                name="section"
                value={sectionInput.section}
                className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (sectionInput.section
                    ? navigate(`/stack/${sectionInput.section}`, { state: { ...sectionInput, date: new Date().toISOString() } })
                    : alert("Please enter the section"))
                }
                placeholder="e.g. SEC-2023-001"
                onChange={(e) => setSectionInput(val => ({ ...val, [e.target.name]: e.target.value }))}
              />
            </div>

            {/* <div className="my-4">
              <label htmlFor="dateInput" className="form-label text-dark mb-2">Select Date</label>
              <input
                id="dateInput"
                type="date"
                name="date"
                value={sectionInput.date}
                className="form-control form-control-lg rounded-3 border-0 shadow-sm"
                onChange={(e) => setSectionInput(val => ({ ...val, [e.target.name]: e.target.value }))}
              />
            </div> */}

            <div className="d-flex justify-content-center mt-5">
              <button
                className="btn btn-light btn-lg w-100 rounded-3 fw-bold shadow-sm"
                style={{
                  background: 'rgba(248, 235, 235, 0.9)',
                  color: '#764ba2',
                  transition: 'all 0.2s',
                  border: 'none'
                }}
                onClick={() =>
                  sectionInput.section
                    ? navigate(`/stack/${sectionInput.section}`, { state: { ...sectionInput, date: new Date().toISOString() } })
                    : alert("Please enter the section")
                }
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Continue
                <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>

            <button
              className="btn btn-sm position-absolute top-0 end-0 m-3 text-dark"
              onClick={() => setSection(false)}
              style={{ opacity: 0.7 }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stacks

