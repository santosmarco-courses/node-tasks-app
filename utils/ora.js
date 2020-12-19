const ora = require("ora");
const chalk = require("chalk");

const ORA_TYPES = {
  START: "START",
  SUCCEED: "SUCCEED",
  FAIL: "FAIL",
};

const colorizeOraText = (type, text) => {
  switch (type) {
    case ORA_TYPES.START:
      return text;
    case ORA_TYPES.SUCCEED:
      return chalk.green.bold(text);
    case ORA_TYPES.FAIL:
      return chalk.red.bold(text);
    default:
      return text;
  }
};

const createOra = ({
  startText = "",
  succeedText = "",
  failText = "",
  onSucceed = () => {},
  onFail = () => {},
}) => {
  const oraInstance = ora();

  return {
    start() {
      oraInstance.start(colorizeOraText(ORA_TYPES.START, startText));
    },
    succeed(res) {
      let finalText = succeedText;
      if (typeof succeedText === "function") {
        finalText = succeedText(res);
      }
      oraInstance.succeed(colorizeOraText(ORA_TYPES.SUCCEED, finalText));
      onSucceed(res);
    },
    fail(err) {
      let finalText = failText;
      if (typeof failText === "function") {
        finalText = failText(err);
      }
      oraInstance.fail(colorizeOraText(ORA_TYPES.FAIL, finalText));
      onFail(err);
    },
  };
};

const execPromiseWithOra = async (promiseCallback, oraOptions) => {
  const oraInstance = createOra(oraOptions);

  oraInstance.start();

  try {
    const res = await promiseCallback();
    oraInstance.succeed(res);
    return res;
  } catch (err) {
    oraInstance.fail(err);
    return err;
  }
};

module.exports = { createOra, execPromiseWithOra };
