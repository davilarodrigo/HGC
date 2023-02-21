<template>
    <div class=" row mt-5 justify-content-md-center">
        <div class="mt-5 col-sm-8 col-lg-4">
            <form id="login-form">
                <h3 class="mt-5">Login</h3>

                <div class="form-outline my-4">
                    <input type="text" id="login-user" class="form-control" />
                    <label class="form-label" for="form2Example1">Username</label>
                </div>

                <div class="form-outline mb-4">
                    <input type="password" id="login-password" class="form-control" />
                    <label class="form-label" for="form2Example2">Password</label>
                </div>

                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">
                        <!-- Checkbox -->
                        <div class="form-check">
                            <input tabindex="-1" class="form-check-input" type="checkbox" value="" id="form2Example31"
                                checked />
                            <label class="form-check-label" for="form2Example31"> Remember me </label>
                        </div>
                    </div>

                    <div class="col">
                        <!-- Simple link -->
                        <a tabindex="-1" href="#!">Forgot password?</a>
                    </div>
                </div>
                <button type="button" id="login-button" class="btn form-control btn-primary mb-4">Sign
                    in</button>
            </form>
        </div>
    </div>
</template>