  <>
            <h1>
              {t("login.reg-message-1")} <a>{t("login.reg-message-2")}</a>
            </h1>
            <Input
              placeholder="Name"
              value={name}
              setValue={setName}
              containerClass={!name && error && "login-error"}
              className="login-form-field"
            ></Input>
            <Input
              placeholder="Surname"
              value={surname}
              setValue={setSurname}
              containerClass={!surname && error && "login-error"}
              className="login-form-field"
            ></Input>
            <Input
              placeholder="Email"
              value={email}
              setValue={CheckAndSetEmail}
              containerClass={!email && error && "login-error"}
              className="login-form-field"
            >
              <HoverTooltip
                content={!emailConds && "Please enter a valid email"}
                inVar={!emailConds}
              ></HoverTooltip>
            </Input>
   
      
            <div>
              {error && <div className="login-error">{error}</div>}
              {t("login.have-account")}{" "}
              <a
                className="change-log-type"
                onClick={() => {
                  togglePage();
                }}
              >
                {t("login.click-here")}
              </a>
            </div>
          </>
		  
		  
		  
		 
  const CheckAndSetPhone = (event) => {
     
    setPhone(event);
    const validate = validator.isMobilePhone(event, "lv-LV", {
      strictMode: false,
    });
     
    if (validate) {
      setPhoneConds(validate);
    } else {
      setPhoneConds(validate);
    }
  };



  

  const togglePage = () => {
    setError("");
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setConfirmPW("");
    // setPhone("");
    setLogin(!isLogin);
  };
  
  
   } else {
      const validate = validateFields();
      if (validate) {
        const err = await SIGNUP({
          email: email,
          name: name,
          surname: surname,
          password: password,
        });
        if (err) {
          setError(err.message);
        } else {
          window.location.href("/confirm-email");
        }
      } else {
        setError("Please fill in the highlighted fields");
      }
    }
	
	  const validateFields = () => {
    var boolToReturn = true;

    if (!name) {
      boolToReturn = false;
    }
    if (!surname) {
      boolToReturn = false;
    }
    if (!email) {
      boolToReturn = false;
    }
    if (!password) {
      boolToReturn = false;
    }
    if (!confirmPW) {
      boolToReturn = false;
    }
    // if (!phone) {
    //   boolToReturn = false;
    // }

    return boolToReturn;
  };
  
  
    const handleLanguageSelect = (val) => {
    const indexToDelete = languages.indexOf(val);
    const newArray = languages;
    newArray.splice(indexToDelete, 1);
    setLanguages(newArray);
    setSelectedLanguages([...selectedLanguages, val]);
  };

  const handleLanguageDelete = (event, val) => {
    event.preventDefault();
    const indexToDelete = selectedLanguages.indexOf(val);
    const newArray = selectedLanguages;
    newArray.splice(indexToDelete, 1);

    setLanguages([...languages, val]);
    setSelectedLanguages(newArray);
  };
  
  
 
  


  const [phone, setPhone] = useState("");
  const [phoneConds, setPhoneConds] = useState(true);
  const [languages, setLanguages] = useState(getLanguageArray());
  const [selectedLanguages, setSelectedLanguages] = useState([]);

	
	  const [isLogin, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");