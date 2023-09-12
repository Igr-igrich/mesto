export class UserInfo {
  constructor({ nameSelector, infoSelector, profileAvatar }) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._profileId = '';
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
      id: this._profileId
    };
  }

  setUserInfo(name, about, id) {
    if (name !== undefined) {
      this._userName.textContent = name;
    }
    if (about !== undefined) {
      this._userInfo.textContent = about;
    }
    if (id !== undefined) {
      this._profileId = id;
    }
  }

  setUserAvatar(avatar) {
    if (avatar !== undefined) {
      this._profileAvatar.style.backgroundImage = `url('${avatar}')`;
    }
  }

}
