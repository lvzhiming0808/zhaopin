<template>
	<div class="photoBox">
		<img class="photoBox_img" src="../../assets/404/timeout.png">
    <div class="messagebox">
      Sorry！该反馈链接已失效，
请直接联系HR进行反馈～～
    </div>
	</div>
</template>

<script>
export default {
}
</script>
<style scoped>
	.photoBox{
		width: 100%;
		height: 100%;
    position: relative;
    min-width: 924px;
	}
  .messagebox{
    font-family: PingFangSC-Regular;
font-size: 26px;
color: #666666;
line-height: 45px;
position: absolute;
right: 25%;
top: 50%;
transform: translate(-25%, -50%);
width: 326px;
  }
	.photoBox_img{
		position: absolute;
		left: 30%;
		top: 50%;
		transform: translate(-50%, -50%)
	}
</style>

