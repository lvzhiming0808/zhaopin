<template>
  <div>
    <el-form-item label="期望地点">
        <el-cascader class="place"
        expand-trigger="hover"
        :options="expectOptions"
        @change="test"
        :props="defaultprops"
        v-model="vexpectPlaceMosel"
        size="small"></el-cascader>
    </el-form-item>
 </div>
</template>
<script>
import Teolece from '../../json/twolevel.js'    //  没有排序的json数据
export default {
  data() {
    return {
      vexpectPlaceMosel: [],    //  model选中的数据
      expectOptions: [],   //  城市组织架构的变量
      defaultprops: {
        value: 'label',
        label: 'label',
        children: 'cities'
      }
    }
  },
  methods: {
    test() {}   //  change事件
  },
  mounted() {
    this.expectOptions = Teolece.data().provs.map((item) => ({
      'value': item.value,
      'label': item.label,
      'cities': Teolece.methods.getProv().filter(i => {
        if (i.prov === item.value) {
          return i
        }
      })
    }))
  }
}
</script>
<style>

</style>

