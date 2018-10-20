<template>
    <div>
        <h1>{{userInfo.userName}}</h1>
        <p>联系电话: {{userInfo.phone}}</p>
        <p>电子邮箱: {{userInfo.email}}</p>
        <p>居住地址: {{userInfo.address}}</p>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
                userInfo: {
                    userName: '张三',
                    userType: 'VIP',
                    phone: '123456789',
                    address: '12400 Imperial Hwy, Norwalk, CA 90650',
                    email: 'zhangsan@qq.com'
                }
            }
        },
    }
</script>

<style scoped lang="scss">
</style>