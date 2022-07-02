// 在某在线招聘网站中，用户可以创建一个简历模板。针对不同的工作岗位，可以复制该简历模板并进行适当修改后，生成一份新的简历。
// 在复制简历时，用户可以选择是否复制简历中的照片：
// 如果选择“是”，则照片将一同被复制，用户对新简历中的照片进行修改不会影响到简历模板中的照片，对模板进行修改也不会影响到新简历；
// 如果选择“否”，则直接引用简历模板中的照片，修改简历模板中的照片将导致新简历中的照片一同修改，反之亦然。
// 先采用原型模式设计该简历复制功能并提供浅克隆和深克隆两套实现方案，绘制对应的类图并编程模拟实现。
class image {
  constructor(src: string) {
    this.src = src;
  }
  src: string;
}
interface resume {
  clone(a: boolean): resume;
  image: image;
}
class resumeTemplate implements resume {
  constructor(image: image) {
    this.image = image;
  }
  clone(deepCopy: boolean): resume {
    if (deepCopy === true) {
      return JSON.parse(JSON.stringify(this));
    } else {
      return Object.assign({}, this);
    }
  }
  image: image;
}
function client2(): void {
  let img = new image("image.jpg");
  let resume1: resumeTemplate;
  resume1 = new resumeTemplate(img);
  let resume2 = resume1.clone(true);
  let resume3 = resume1.clone(false);

  resume1.image.src = "image2.jpg";
  console.log(resume1.image.src);
  console.log(resume2.image.src);
  console.log(resume3.image.src);
}
client2();