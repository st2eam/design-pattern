// 系统提供一个主菜单（Menu），在主菜单中包含了一些菜单项（MenuItem），可以通过Menu类的addMenuItem（）方法增加菜单项。
// 菜单项的主要方法是click（），每一个菜单项包含一个抽象命令类，
// 具体命令类包括OpenCommand（打开命令）、CreateCommand（新建命令）、EditCommand（编辑命令）等，
// 命令类具有一个execute（）方法，用于调用公告板系统界面类（BoardScreen）的open(), create(), edit()等方法。
// 现使用命令模式设计该系统，使得MenuItem类与BoardScreen类的耦合度降低，绘制类图并编程实现。
abstract class Commend {
  abstract execute(): void;
}

class MenuItem {
  constructor(commend: Commend) {
    this.commend = commend;
  }
  private commend: Commend;
  public click(): void {
    this.commend.execute()
  }
}

class Menu {
  public MenuItems: MenuItem[] = [];
  public addMenuItem(item: MenuItem): void {
    this.MenuItems.push(item);
  }
}

class BoardScreen {
  private static boardscreen: BoardScreen = new BoardScreen();
  public static getInstance(): BoardScreen {
    return this.boardscreen;
  }
  public open(): void {
    console.log("BoardScreen Open");
  }
  public create(): void {
    console.log("BoardScreen Create");
  }
  public edit(): void {
    console.log("BoardScreen Edit");
  }
}

class OpenCommand extends Commend {
  public execute(): void {
    BoardScreen.getInstance().open();
  }
}

class CreateCommand extends Commend {
  public execute(): void {
    BoardScreen.getInstance().create();
  }
}

class EditCommand extends Commend {
  public execute(): void {
    BoardScreen.getInstance().edit();
  }
}

const client = function () {
  let menu: Menu = new Menu();
  let openItem: MenuItem = new MenuItem(new OpenCommand());
  let createItem: MenuItem = new MenuItem(new CreateCommand());
  let editItem: MenuItem = new MenuItem(new EditCommand());
  menu.addMenuItem(openItem);
  menu.addMenuItem(createItem);
  menu.addMenuItem(editItem);
  for (let item of menu.MenuItems) {
    item.click();
  }
}()