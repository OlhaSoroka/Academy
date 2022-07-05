<template>
    <div class="login">
        <h1 class="text-pink-400">This is LOGIN page</h1>        
        <div class="max-w-xl mx-auto px-4">
            <div class="rounded-lg shadow-lg p-4">
                <LoginForm @submitAuth='authSubmitted'/>
                <p 
                        @click="sendPasswordToEmail" 
                        class="mx-2 cursor-pointer text-center hover:opacity-75 transition-opacity underline">Send Password to Email</p>
            </div>
        </div>    
    </div>    
</template>

<script>

    import LoginForm from '@/components/LoginForm'
    export default ({
        name: 'LogIn',
        components: {
            LoginForm
        },
        data() {
            return {
                authSubmitted: Object
            }
        }, 
        methods: {
            sendPasswordToEmail(){
                 
            }   
        }        
    })

</script>