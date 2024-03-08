import { useState } from "react";
import { Button, Overlay, OverlayTrigger, Popover } from "react-bootstrap";

const popover = () => {
  return (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );
};

export default function SummaryForm() {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <div>no ice cream will actually be delivered</div>
      <label htmlFor="agree">
        I agree to,{" "}
        <OverlayTrigger placement="right" overlay={popover()}>
          <span>Terms and Conditions</span>
        </OverlayTrigger>
      </label>
      <input
        type="checkbox"
        name="agree"
        id="agree"
        checked={!disabled}
        onChange={(e) => setDisabled(!e.target.checked)}
      />

      <button disabled={disabled}>Submit</button>
    </div>
  );
}
