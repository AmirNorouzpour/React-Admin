import reportAnimation from "../lottie/report.lottie";
import typedefAnimation from "../lottie/typedef.lottie";
import systemAnimation from "../lottie/system.lottie";
import stateAnimation from "../lottie/state.lottie";
import onlineAnimation from "../lottie/online.lottie";
import usersAnimation from "../lottie/users.lottie";
import auditAnimation from "../lottie/audit.lottie";
import errorAnimation from "../lottie/error.lottie";
import failedAnimation from "../lottie/fingerprint.lottie";
import enterAnimation from "../lottie/enter.lottie";
import userAnimation from "../lottie/user.lottie";
import loadingAnimation from "../lottie/loading.lottie";
import langAnimation from "../lottie/lang.lottie";
import designAnimation from "../lottie/design.lottie";

class LottieMapper {
  private static fileMap: Map<string, any> = new Map([
    ["report", reportAnimation],
    ["system", systemAnimation],
    ["typedef", typedefAnimation],
    ["users", usersAnimation],
    ["state", stateAnimation],
    ["online", onlineAnimation],
    ["audit", auditAnimation],
    ["error", errorAnimation],
    ["fingerprint", failedAnimation],
    ["enter", enterAnimation],
    ["user", userAnimation],
    ["loading", loadingAnimation],
    ["design", designAnimation],
  ]);

  public static GetFile(key: string): any | undefined {
    return this.fileMap.get(key);
  }
}

export default LottieMapper;
