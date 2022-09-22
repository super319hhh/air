import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCalls, unArchiveCall } from "../store/reducer/index";
import { arrayGroupBy } from "../utils/group";
import moment from "moment";

const Inbox = (__props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllCalls());
  }, []);

  let calls = useSelector((state) => state.main.calls);

  calls = calls
    .filter((item) => item.is_archived)
    .map((item) =>
      Object.assign({}, item, {
        Date: moment(item.created_at).format("MMM Do YY"),
      })
    );

  let groupedCalls = arrayGroupBy(calls, "Date"),
    handleUnArchiveCall = (id) => {
      dispatch(unArchiveCall(id));
    };

  return (
    //groupedcalls to be 0 length?
    <div className="body">
      {groupedCalls.map((item1) => {
        return (
          <div>
            <div className="call_date">{item1[0].Date}</div>
            {item1.map((item2) => {
              return (
                <div>
                  <div className="flex_row call_body">
                    <div className="flex_column">
                      <div className="call_from">{item2.from}</div>
                      <div className="call_vie">Try to call on {item2.via}</div>
                    </div>
                    <div className="flex_column">
                      {moment(item2.created_at).format("LT")}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          handleUnArchiveCall(item2.id);
                        }}
                      >
                        Unarchive
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Inbox;
