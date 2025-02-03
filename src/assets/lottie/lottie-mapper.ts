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
  ]);

  public static GetFile(key: string): any | undefined {
    return this.fileMap.get(key);
  }
}

export default LottieMapper;
