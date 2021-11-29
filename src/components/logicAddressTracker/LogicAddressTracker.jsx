import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchAddressTracker } from "../searchAddressTracker/SearchAddressTracker";
import { getAddressTracker } from "../../features/ipAddressTrackerSlice/ipAddressTrackerSlice";
import "./addressTrackerComponent.scss";

export const LogicAddressTracker = () => {
  const [addressIpToValidation, setAddressIpToValidation] = useState("");
  const [addressTrackerToSendApi, setAddressTrackerToSendApi] = useState("");
  const [wrongAddressTracker, setWrongAddressTracker] = useState("");
  const [toggleSendApi, setToggleSendApi] = useState({
    addressTracker: false,
    wrongAddressTracker: false,
  });

  const dispatch = useDispatch();
  const { addressTracker, ipStatusFetch } = useSelector(
    (state) => state.addressTracker
  );

  const handleSubmitSearchAddress = useCallback(
    (e) => {
      e.preventDefault();
      toggleSendApi.addressTracker &&
        dispatch(getAddressTracker(addressTrackerToSendApi));
      setAddressIpToValidation("");
      setAddressTrackerToSendApi("");
    },
    [addressTrackerToSendApi, dispatch, toggleSendApi.addressTracker]
  );

  const handleChangeSearchAddress = useCallback((e) => {
    setAddressIpToValidation(e.target.value);
    const regExpIpAddress =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const regExpDomainAddress =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    if (
      regExpIpAddress.test(e.target.value) ||
      regExpDomainAddress.test(e.target.value)
    ) {
      setToggleSendApi((prevState) => ({
        addressTracker: true,
        wrongAddressTracker: false,
      }));
      setAddressTrackerToSendApi(e.target.value);
    } else {
      setToggleSendApi((prevState) => ({
        addressTracker: false,
        wrongAddressTracker: true,
      }));
      setWrongAddressTracker("is wrong url or domain");
    }
  }, []);

  useEffect(() => {
    dispatch(getAddressTracker());
  }, []);

  return (
    <main>
      <SearchAddressTracker
        onSubmitAddress={handleSubmitSearchAddress}
        onChangeAddress={handleChangeSearchAddress}
        valueInputAddressTracker={addressIpToValidation}
        arrayAddressTracker={addressTracker}
        ipStatusFetch={ipStatusFetch}
      />
    </main>
  );
};
