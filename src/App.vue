<template>
  <n-layout>
    <n-space vertical>
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <div style="font-size:medium;">PMCaptcha Web Configure</div>
      </n-layout-header>

      <n-layout-content content-style="display: flex;justify-content: center;">
        <n-space vertical>
          <n-card style="max-width: 1200px;">
            <n-space vertical>
              <n-alert title="无效的配置文件" type="warning" closable style="max-width: 1200px;" v-if="usedefault">
                将使用默认配置
              </n-alert>
              <n-form label-placement="top" :model="model">
                <n-grid :cols="24" :x-gap="24">
                  <n-form-item-gi :span="24" label="验证通过消息" path="welcome"><n-input type="textarea" :autosize="{
                    minRows: 1
                  }" placeholder="留空为默认消息" v-model:value="model.welcome"></n-input></n-form-item-gi>
                  <n-form-item-gi :span="12" label="关键词白名单列表(英文逗号分隔)" path="whitelist"><n-input type="text"
                      placeholder="留空以重置" v-model:value="model.whitelist"></n-input></n-form-item-gi>
                  <n-form-item-gi :span="12" label="关键词黑名单列表(英文逗号分隔)" path="blacklist"><n-input type="text"
                      placeholder="留空以重置" v-model:value="model.blacklist"></n-input></n-form-item-gi>
                  <n-form-item-gi :span="4" label="计算验证超时时间" path="timeout"><n-input-number placeholder="30"
                      :show-button="false" v-model:value="model.timeout">
                      <template #suffix>
                        秒
                      </template>
                    </n-input-number></n-form-item-gi>
                  <n-form-item-gi :span="4" label="贴纸验证超时时间" path="sticker_timeout"><n-input-number placeholder="30"
                      :show-button="false" v-model:value="model.sticker_timeout">
                      <template #suffix>
                        秒
                      </template>
                    </n-input-number></n-form-item-gi>
                  <n-form-item-gi :span="4" label="图像验证超时时间" path="img_timeout"><n-input-number placeholder="300"
                      :show-button="false" v-model:value="model.img_timeout">
                      <template #suffix>
                        秒
                      </template>
                    </n-input-number></n-form-item-gi>
                  <n-form-item-gi :span="4" label="根据共群数量自动白名单" path="groups_in_common"><n-input-number placeholder="-1"
                      :show-button="false" v-model:value="model.groups_in_common">
                    </n-input-number></n-form-item-gi>
                  <n-form-item-gi :span="4" label="根据历史消息数自动白名单" path="chat_history"><n-input-number placeholder="-1"
                      :show-button="false" v-model:value="model.chat_history">
                    </n-input-number></n-form-item-gi>
                  <n-form-item-gi :span="4" label="轰炸检测触发人数" path="flood"><n-input-number placeholder="5"
                      :show-button="false" v-model:value="model.flood">
                    </n-input-number></n-form-item-gi>
                  <n-form-item-gi :span="4" label="图像验证码重试次数" path="img_captcha_retry"><n-input-number placeholder="3"
                      :show-button="false" v-model:value="model.img_captcha_retry">
                    </n-input-number></n-form-item-gi>
                  <n-form-item-gi :span="4" label="验证失败处理方式" path="action"> <n-select :options="actionlist"
                      v-model:value="model.action" /></n-form-item-gi>
                  <n-form-item-gi :span="4" label="验证码类型" path="type"> <n-select :options="typelist"
                      v-model:value="model.type" /></n-form-item-gi>
                  <n-form-item-gi :span="5" label="图像验证码接口" path="img_captcha"> <n-select :options="imgproviderlist"
                      v-model:value="model.img_captcha" /></n-form-item-gi>
                  <n-form-item-gi :span="5" label="轰炸结束后处理方式" path="flood_act"> <n-select :options="floodactlist"
                      v-model:value="model.flood_act" /></n-form-item-gi>
                  <n-form-item-gi :span="4" label="Premium 用户规则" path="premium"> <n-select :options="premiumlist"
                      v-model:value="model.premium" /></n-form-item-gi>
                  <n-form-item-gi :span="4" label="主动私聊自动白名单" path="initiative">
                    <n-switch v-model:value="model.initiative" />
                  </n-form-item-gi>
                  <n-form-item-gi :span="3" label="启用陌生人私聊" path="disable_pm">
                    <n-switch v-model:value="model.disable_pm" />
                  </n-form-item-gi>
                  <n-form-item-gi :span="3" label="验证失败时举报" path="report">
                    <n-switch v-model:value="model.report" />
                  </n-form-item-gi>
                  <n-form-item-gi :span="3" label="减少信息发送" path="silent">
                    <n-switch v-model:value="model.silent" />
                  </n-form-item-gi>
                  <n-form-item-gi :span="5" label="被轰炸时启用用户名频道转移" path="flood_username">
                    <n-switch v-model:value="model.flood_username" />
                  </n-form-item-gi>
                  <n-form-item-gi :span="5" label="允许PMCaptcha收集验证数据" path="collect_logs">
                    <n-switch v-model:value="model.collect_logs" />
                  </n-form-item-gi>
                </n-grid>
              </n-form>
            </n-space>
          </n-card>
          <n-card style="max-width: 1200px;" title="将下面的命令粘贴至 Telegram 以应用设置">
            <n-input type="textarea" :autosize="{
              minRows: 1
            }" readonly="true" v-model:value="cmd"></n-input>
          </n-card></n-space>
      </n-layout-content>
    </n-space>
    {{ newconf }}{{ conf }}
  </n-layout>
  {{ model }}
</template>
<script setup>
import { ref, watch } from 'vue';
import { NLayout, NLayoutHeader, NLayoutContent, NCard, NSpace, NGrid, NFormItemGi, NForm, NInput, NInputNumber, NSwitch, NAlert, NSelect } from 'naive-ui'
import { actionlist, premiumlist, typelist, floodactlist, imgproviderlist, defaults } from "./utils"
const usedefault = ref(false)
const conf = ref({ "cmd": defaults.cmd, "version": defaults.version })
try {
  conf.value = JSON.parse(atob(location.pathname.replace(new RegExp("/", "g"), "")))
} catch (e) {
  usedefault.value = true
}

const model = ref({
  "welcome": "",
  "blacklist": "",
  "whitelist": "",
  "timeout": null,
  "img_timeout": null,
  "sticker_timeout": null,
  "disable_pm": false,
  "action": "ban",
  "report": true,
  "premium": "none",
  "groups_in_common": null,
  "chat_history": null,
  "initiative": true,
  "silent": false,
  "flood": null,
  "flood_username": false,
  "flood_act": "delete",
  "collect_logs": true,
  "type": "math",
  "img_captcha": "func",
  "img_captcha_retry": null
})
for (let i in conf.value) {
  model.value[i] = conf.value[i]
}
const newconf = ref({})
const cmd = ref("," + conf.value.cmd + " web " + btoa(JSON.stringify(newconf.value)))
watch(model.value, (nv) => {
  newconf.value = {}
  for (let i in nv) {
    console.log(i)
    console.log(i in conf.value)
    console.log(conf[i] !== model.value[i])
    if (i in conf.value && conf.value[i] !== model.value[i]) {
      newconf.value[i] = model.value[i]
    }
    if (i in conf.value === false && defaults[i] !== model.value[i]) {
      newconf.value[i] = model.value[i]
    }
  }
  cmd.value = "," + conf.value.cmd + " web " + btoa(JSON.stringify(newconf.value))
})
</script>