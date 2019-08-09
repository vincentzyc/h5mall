<template>
  <base-page>
    <common-header title="成为农户" style="background:#000" />
    <div class="become_farmer">
      <div class="become_farmerc">
        <div class="become_farmera">
          <p>IOS版本下载</p>
        </div>
        <div class="become_farmerb">
          <p>安卓版本下载</p>
        </div>
      </div>
    </div>
  </base-page>
</template>

<style lang="stylus" scoped>
.become_farmer {
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/zfb.jpg') no-repeat 0 0 / 100% 100%;
  position: relative;
  font-size: 14px;
  color: #ffffff;
}

.become_farmerc {
  display: -webkit-box;
  position: absolute;
  bottom: 100px;
  width: 100%;
}

.become_farmerc>div {
  -webkit-box-flex: 1;
  height: 49px;
  border: 1px solid #6c2a00;
  border-radius: 15px;
  background: -webkit-linear-gradient(top, #ef8222, #f6d26d);
  box-shadow: 0px 0px 10px 1px #6c2a00;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}

.become_farmera {
  margin-left: 30px;
  margin-right: 5.5px;
}

.become_farmera>p {
  background: url('~@/assets/img/android.png') no-repeat;
  background-size: 27.5px;
  height: 32px;
  line-height: 32px;
  padding-left: 34px;
}

.become_farmerb {
  margin-left: 5.5px;
  margin-right: 30px;
}

.become_farmerb>p {
  background: url('~@/assets/img/ios.png') no-repeat;
  background-size: 27.5px;
  height: 32px;
  line-height: 32px;
  padding-left: 34px;
}
</style>
