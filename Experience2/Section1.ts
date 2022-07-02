//某软件公司为新开发的智能手机控制与管理软件提供了一键备份功能，
//通过该功能可以将原本存储在手机中的通讯录、短信、照片、歌曲等资料一次性全部拷贝到移动存储介质（例如MMC卡或SD卡）中。
//在实现过程中需要与多个已有的类进行交互，例如通讯录管理类、短信管理类等。为了降低系统的耦合度，使用外观模式来设计并编程模拟实现该一键备份功能。
interface Management {
  backup(): void;
}
class AddressBook implements Management {
  backup() {
    console.log("AddressBook backup");
  }
}
class Message implements Management {
  backup() {
    console.log("Message backup");
  }
}
class Photo implements Management {
  backup() {
    console.log("Photo backup");
  }
}
class Music implements Management {
  backup() {
    console.log("Music backup");
  }
}
class Facade {
  constructor(addressBook: AddressBook, message: Message, photo: Photo, music: Music) {
    this.addressBook = addressBook;
    this.message = message;
    this.photo = photo;
    this.music = music;
  }
  backup() {
    this.addressBook.backup();
    this.message.backup();
    this.photo.backup();
    this.music.backup();
  }
  private addressBook: AddressBook;
  private message: Message;
  private photo: Photo;
  private music: Music
}
function client() {
  let facade = new Facade(new AddressBook(), new Message(), new Photo(), new Music());
  facade.backup();
}
client();