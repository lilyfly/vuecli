<template>
  <div>
    <editor :value="myValue" @input="v=>$emit('update',v)" :init="initValue">
    </editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import "tinymce/plugins/link"
import "tinymce/plugins/image"
import "tinymce/plugins/table"
import "tinymce/plugins/code"
import 'tinymce/plugins/media'// 插入视频插件
import "tinymce/plugins/wordcount"
export default {
  name: 'tinyEditor',
  props: {
    myValue: String,
    plugins: {
      type: Array,
      default: () => ['link image table', 'code media  wordcount']
    },
    toolbar: {
      type: String,
      default: 'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat |link image media  table|code wordcount '
    }
  },
  data() {
    return {
      vvv: this.myValue,
      initValue: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 500,
        menubar: false,// 隐藏最上方menu
        branding: false,//技术支持(Powered by Tiny || 由Tiny驱动)
        paste_data_images: true, // 允许粘贴图像
        elementpath: false,  //禁用编辑器底部的状态栏
        statusbar: false, // 隐藏编辑器底部的状态栏
        browser_spellcheck: true, // 拼写检查
        plugins: this.plugins,
        toolbar: this.toolbar,
        // images_upload_handler: function (blobInfo, success, failure) {
        //   var xhr, formData;

        //   xhr = new XMLHttpRequest();
        //   xhr.withCredentials = false;
        //   xhr.open('POST', 'postAcceptor.php');

        //   xhr.onload = function () {
        //     var json;

        //     if (xhr.status != 200) {
        //       failure('HTTP Error: ' + xhr.status);
        //       return;
        //     }

        //     json = JSON.parse(xhr.responseText);

        //     if (!json || typeof json.location != 'string') {
        //       failure('Invalid JSON: ' + xhr.responseText);
        //       return;
        //     }

        //     success(json.location);
        //   };

        //   formData = new FormData();
        //   formData.append('file', blobInfo.blob(), blobInfo.filename());

        //   xhr.send(formData);
        // }
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        },
        file_picker_callback: function (callback, value, meta) {
          //要先模拟出一个input用于上传本地文件
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          //你可以给input加accept属性来限制上传的文件类型
          input.setAttribute('accept', 'video/* ');
          input.click();
          input.onchange = function () {
            var file = this.files[0];

            var xhr, formData;
            console.log(file.name);
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', '/demo/upimg.php');
            xhr.onload = function () {
              var json;
              if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
              }
              json = JSON.parse(xhr.responseText);
              if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
              }
              callback(json.location);
            };
            formData = new FormData();
            formData.append('file', file, file.name);
            xhr.send(formData);
          }
          //下方被注释掉的是官方的一个例子
          //放到下面给大家参考

          /*var reader = new FileReader();
          reader.onload = function () {
              // Note: Now we need to register the blob in TinyMCEs image blob
              // registry. In the next release this part hopefully won't be
              // necessary, as we are looking to handle it internally.
              var id = 'blobid' + (new Date()).getTime();
              var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              // call the callback and populate the Title field with the file name
              callback(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);*/
          // Provide file and text for the link dialog
          // if (meta.filetype == 'file') {
          //   callback('mypage.html', { text: 'My text' });
          // }
          // // Provide image and alt text for the image dialog
          // if (meta.filetype == 'image') {
          //   callback('myimage.jpg', { alt: 'My alt text' });
          // }
          // // Provide alternative source and posted for the media dialog
          // if (meta.filetype == 'media') {
          //   callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
          // }
        }
      }
    }
  },
  mounted() {
    window.tinymce.baseURL = '/tinymce'//解决发布的时候路径问题
    tinymce.init({}) // 特别注意这个空对象的存在，如果这个初始化空对象不存在依旧会报错
  },
  methods: {
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      //   this.myValue = ''
    }
  },
  inject: ['uuu'],
  components: {
    'editor': Editor
  }
}
</script>
<style lang="scss">
</style>