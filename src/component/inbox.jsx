import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCalls,
  archiveCall,
  fetchCallById,
  closeExtend,
} from "../store/reducer/index";
import { arrayGroupBy } from "../utils/group";
import moment from "moment";
import { useState } from "react";

const Inbox = (__props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAllCalls());
  }, []);

  React.useEffect(() => {
    if (!__props.extend) {
      dispatch(closeExtend());
    }
  }, [__props.extend]);

  let calls = useSelector((state) => state.main.calls);

  calls = calls
    .filter((item) => !item.is_archived)
    .map((item) =>
      Object.assign({}, item, {
        Date: moment(item.created_at).format("MMM Do YY"),
      })
    );

  let groupedCalls = arrayGroupBy(calls, "Date"),
    handleArchiveCall = (ev, id) => {
      ev.stopPropagation();
      dispatch(archiveCall(id));
    },
    handleExtend = (ev, id) => {
      ev.stopPropagation();
      __props.setExtend(id);
      dispatch(fetchCallById(id));
    };

  return (
    //groupedcalls to be 0 length?
    <div className="body">
      {groupedCalls.map((item1, index) => {
        return (
          <div key={index}>
            <div className="call_date">{item1[0].Date}</div>
            {item1.map((item2) => {
              return (
                <div key={item2.id}>
                  <div
                    className={`flex_row call_body ${
                      __props.extend === item2.id ? "extended" : ""
                    }`}
                    onClick={(ev) => {
                      handleExtend(ev, item2.id);
                    }}
                  >
                    <div className="flex_column">
                      <div className="call_from">
                        {item2.direction === "outbound" ? item2.to : item2.from}
                      </div>
                      <div className="call_vie">Try to call on {item2.via}</div>
                      {__props.extend === item2.id ? (
                        <div>
                          <div className="call_duration">
                            Duration: {item2.duration} sec
                          </div>
                          <div className="call_type">{item2.call_type}</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex_column">
                      {moment(item2.created_at).format("LT")}
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={(ev) => {
                          handleArchiveCall(ev, item2.id);
                        }}
                      >
                        Archive
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
