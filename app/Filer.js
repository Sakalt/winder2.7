<!-- 前述のHTMLに追加 -->
<script src="https://unpkg.com/browserfs"></script>
<script>
  BrowserFS.configure({ fs: "LocalStorage" }, function (err) {
    if (err) return console.error(err);
    const fs = BrowserFS.BFSRequire('fs');
    
    fs.writeFile('/hello.txt', 'Hello, World!', function (err) {
      if (err) return console.error(err);
      fs.readFile('/hello.txt', 'utf8', function (err, contents) {
        if (err) return console.error(err);
        alert(contents); // ファイルの内容を表示
      });
    });
  });
</script>
