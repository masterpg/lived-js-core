const assert = chai.assert;
import * as parser from '../../src/parser';

suite('parser', () => {

  setup(() => {
  });

  teardown(() => {
  });

  test('textToBytes(): 英語', () => {
    const text = "Wikipedia is a multilingual, web-based, free-content encyclopedia project supported by the Wikimedia Foundation and based on a model of openly editable content. The name \"Wikipedia\" is a portmanteau of the words wiki (a technology for creating collaborative websites, from the Hawaiian word wiki, meaning \"quick\") and encyclopedia. Wikipedia's articles provide links designed to guide the user to related pages with additional information.";
    const bytes = parser.textToBytes(text);
    const actual = parser.bytesToText(bytes);
    assert.equal(actual, text);
  });

  test('textToBytes(): 日本語', () => {
    const text = 'ある日、遊牧民の少年スーホは帰り道で倒れてもがいていた白い子馬を拾い、その子馬を大切に育てる。それから数年後、領主が自分の娘の結婚相手を探すため競馬大会を開く。スーホは立派に成長した白い馬に乗り、見事競馬大会で優勝する。しかし、領主は貧しいスーホを娘とは結婚させず、スーホに銀貨を三枚渡し、さらには白い馬を自分に渡すよう命令する。スーホはその命令を拒否し、領主の家来達に暴行され白い馬を奪われる。命からがら家へ辿り着くが、白い馬を奪われた悲しみは消えなかった。 その頃、白い馬は領主が宴会をしている隙を突いて逃げ出したが、逃げ出した際に領主の家来達が放った矢に体中を射られていた為、スーホの元に戻った時には瀕死の状態であった。看病むなしく白い馬は次の日に死んでしまう。スーホは幾晩も眠れずにいたが、ある晩ようやく眠りにつき、夢の中で白馬をみる。白馬は自分の死体を使って楽器を作るようにスーホに言い残した。そうして出来たのがモリンホール（馬頭琴）であった。';
    const bytes = parser.textToBytes(text);
    const actual = parser.bytesToText(bytes);
    assert.equal(actual, text);
  });

  test('textToBytes(): 記号「\', \", /, \\, \\n, \\r\\n」', () => {
    const text = '\', \", /, \\, \\n, \\r\\n';
    const bytes = parser.textToBytes(text);
    const actual = parser.bytesToText(bytes);
    assert.equal(actual, text);
  });

  test('textToBytes(): 特殊文字', () => {
    const text = 'I ½ ♥ ☀ ☁ ➹ ✍';
    const bytes = parser.textToBytes(text);
    const actual = parser.bytesToText(bytes);
    assert.equal(actual, text);
  });

  test('bytesToHex()', () => {
    const bytes = new Uint8Array([0, 1, 2, 16, 17, 255]);
    const actual = parser.bytesToHex(bytes);
    assert.equal(actual, '0001021011ff');
  });

  test('hexToBytes(): No.1', () => {
    const hex = '0';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([0]));
  });

  test('hexToBytes(): No.2', () => {
    const hex = '00';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([0]));
  });

  test('hexToBytes(): No.3', () => {
    const hex = '1';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([1]));
  });

  test('hexToBytes(): No.4', () => {
    const hex = '01';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([1]));
  });

  test('hexToBytes(): No.5', () => {
    const hex = '001';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([0, 1]));
  });

  test('hexToBytes(): No.6', () => {
    const hex = '010';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([0, 16]));
  });

  test('hexToBytes(): No.7', () => {
    const hex = '100';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([1, 0]));
  });

  test('hexToBytes(): No.8', () => {
    const hex = '1021011ff';
    const actual = parser.hexToBytes(hex);
    assert.deepEqual(actual, new Uint8Array([1, 2, 16, 17, 255]));
  });

  test('objectToQueryString(): 一般的なケース', () => {
    const actual = parser.objectToQueryString({
      first: 'taro',
      last: 'yamada',
      age: 15,
    });
    assert.equal(actual, 'first=taro&last=yamada&age=15');
  });

  test('objectToQueryString(): プロパティの値にスラッシュを含んだ場合', () => {
    const actual = parser.objectToQueryString({
      home: 'http://taro.yamada/home'
    });
    assert.equal(actual, 'home=http%3A%2F%2Ftaro.yamada%2Fhome');
  });

  test('objectToQueryString(): プロパティの値が配列の場合', () => {
    const actual = parser.objectToQueryString({
      array: ['one', 'two', 'three']
    });
    assert.equal(actual, 'array=one&array=two&array=three');
  });

  test('objectToQueryString(): プロパティの値が空の場合', () => {
    const actual = parser.objectToQueryString({
      first: 'taro',
      last: 'yamada',
      empty1: undefined,
      empty2: null,
    });
    assert.equal(actual, 'first=taro&last=yamada');
  });

  test('objectToQueryString(): nullを指定した場合', () => {
    const actual = parser.objectToQueryString(null);
    assert.equal(actual, '');
  });

  test('objectToQueryString(): 空オブジェクトを指定した場合', () => {
    const actual = parser.objectToQueryString({});
    assert.equal(actual, '');
  });

  test('bytesToJSON(): 正常ケース', () => {
    const data = { first: 'taro', last: 'yamada' };
    const buff = parser.textToBytes(JSON.stringify(data));
    const result = parser.bytesToJSON(buff);
    assert.equal(result['first'], 'taro');
    assert.equal(result['last'], 'yamada');
  });

  test('bytesToArrayBuffer(): 正常ケース', () => {
    const buff = parser.textToBytes('Hello World!');
    const result = parser.bytesToArrayBuffer(buff);
    const text = parser.bytesToText(new Uint8Array(result, 0, result.byteLength));
    assert.equal(text, 'Hello World!');
  });

  test('bytesToBolb(): 正常ケース', () => {
    const buff = parser.textToBytes('Hello World!');
    const result = parser.bytesToBlob(buff, 'text/plain');
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () => {
        const text = parser.bytesToText(new Uint8Array(reader.result));
        assert.equal(text, 'Hello World!');
        resolve();
      });
      reader.readAsArrayBuffer(result);
    });
  });

  test('bytesToDocument(): 正常ケース(HTML形式へ変換)', () => {
    const buff = parser.textToBytes('<a id="a"><b id="b">hey!</b></a>');
    const result = parser.bytesToDocument(buff, 'text/html');
    assert.instanceOf(result, Document);
  });

  test('bytesToXML(): 正常ケース', () => {
    const buff = parser.textToBytes('<a id="a"><b id="b">hey!</b></a>');
    const result = parser.bytesToXML(buff);
    assert.instanceOf(result, XMLDocument);
  });

  test('bytesToXML(): 不正なXML文字列をパースさせようとした場合', () => {
    const buff = parser.textToBytes('<a id="a"><b id="b">hey!</b></abc>');
    try {
      parser.bytesToXML(buff);
    } catch (_) {
      return;
    }
    throw new Error('検証エラー: 例外が発生しませんでした。');
  });

});
