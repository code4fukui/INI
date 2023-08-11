export const INI = {
  parse: (s) => {
    const ss = s.split("\n").map(s => {
      const n = s.indexOf(";");
      if (n >= 0) {
        s = s.substring(0, n);
      }
      return s.trim();
    }).filter(s => s);
    const obj = {};
    let curobj = obj;
    for (const s of ss) {
      if (s[0] == "[") { // section
        const path = s.substring(1, s.indexOf("]"));
        const names = path.split("/");
        curobj = obj;
        for (let i = 0; i < names.length; i++) {
          const name = names[i];
          if (curobj[name] == null) {
            curobj[name] = {};
          }
          curobj = curobj[name];
        }
      } else {
        const n = s.indexOf("=");
        if (n < 0) {
          throw new Error("parse error not include an equal: " + s);
        }
        const name = s.substring(0, n);
        const valsrc = s.substring(n + 1);
        const val = JSON.parse(`"${valsrc}"`);
        curobj[name] = val;
      }
    }
    return obj;
  },
  stringify: (obj) => {
    const ss = [];
    const write = (basepath, obj) => {
      for (const name in obj) {
        const o = obj[name];
        const t = typeof o;
        if (t == "number") {
          ss.push(name + "=" + o);
        } else if (t == "string") {
          const s = JSON.stringify(o);
          ss.push(name + "=" + s.substring(1, s.length - 1));
        } else if (typeof o == "object") {
          ss.push("[" + basepath.substring(1) + name + "]");
          write(basepath + name + "/", o);
          ss.push("[" + basepath.substring(1) + "]");
        } else {
          throw new Error("can't stringify " + t + " " + o);
        }
      }
    };
    write("/", obj);
    const ss2 = [];
    for (let i = 0; i < ss.length; i++) {
      const s = ss[i];
      if (s[0] == "[") {
        for (i++; i < ss.length; i++) {
          if (ss[i][0] != "[") {
            ss2.push(ss[i - 1]);
            break;
          }
        }
        i--;
      } else {
        ss2.push(s);
      }
    }
    return ss2.join("\n") + "\n";
  },
};
