const ATMDeposit = ({ onChange, isDeposit, validTransaction }) => {
  const choice = ['Deposit', 'Withdraw'];
  const isValid = validTransaction;

  console.log(`ATM isDeposit: ${isDeposit}`);
  console.log(`ATM isValid: ${isValid}`);
  return (
    <div className="mt-5">
      {/* <h3> {choice[Number(!isDeposit)]}</h3> */}
      <h6 className="card-subtitle mb-2 text-muted">Select the amount to {choice[Number(!isDeposit)].toLowerCase()}</h6>
      <div className="input-group mb-3">
        <input id="number-input" type="number" min={0} class="form-control w-50" onChange={onChange} placeholder="$0.00" aria-label="Select amount" aria-describedby="btnSubmit"/>
        <button id="btnSubmit" className="btn btn-secondary w-50" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </div>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Balance: $${totalState.toFixed(2)} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    if (event.target.value <= 0) {
      setValidTransaction(false);
      return;
    }
    if (atmMode == "Withdraw" && event.target.value > totalState) 
      setValidTransaction(false);
    else setValidTransaction(true);

    setDeposit(Number(event.target.value));
  };

  const resetValue = () => {
    if (document.getElementById("number-input"))
      document.getElementById("number-input").value = "";
  }

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    resetValue();
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    let mode = event.target.value;
    setAtmMode(mode);
    if (mode == "") return;
    resetValue();
    setIsDeposit(mode == "Deposit" ? true : false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card mx-auto my-5" style={{width: "50%", minWidth: "20rem", textAlign: "center"}}>
      <h2 class="card-header">ATM</h2>
        <div className="card-body py-5">
          <div className="container">
            <div class="row">
              <div class="col-sm m-auto">          
                <h6 className="text-muted">Account Balance:</h6>
                <h1 className="card-title fw-bold display-4">${totalState.toFixed(2)}</h1>
              </div>
              <div className="col-sm m-auto ps-4 border-start">
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group" onChange={(e) => handleModeSelect(e)}>
                  <input type="radio" className="btn-check" value={"Deposit"} name="btnradio" id="btnDeposit" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btnDeposit">Deposit</label>
                  <input type="radio" className="btn-check" value={"Withdraw"} name="btnradio" id="btnWithdraw" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btnWithdraw">Withdraw</label>
                </div>
                <div>
                  {
                    atmMode != "" && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} validTransaction={validTransaction}></ATMDeposit>
                  }
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
      </div>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
