package com.pupper.app

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

private class PuppyShape(val d: String, val fill: Color?, val stroke: Color?, val width: Float, val alpha: Float)

/** Pupper's mascot: a cute golden retriever puppy (same artwork as the website and the launcher icon). */
private val puppy = listOf(
    PuppyShape("M12 34 a20 18 0 1 0 40 0 a20 18 0 1 0 -40 0 Z", Color(0xFFE2A83E), null, 0f, 1f),
    PuppyShape("M15 21 C7 20 3.5 36 9.5 46 C13.5 51.5 18.5 45 19.5 36 C20.3 29.5 19 22.5 15 21 Z", Color(0xFFB9772A), null, 0f, 1f),
    PuppyShape("M49 21 C57 20 60.5 36 54.5 46 C50.5 51.5 45.5 45 44.5 36 C43.7 29.5 45 22.5 49 21 Z", Color(0xFFB9772A), null, 0f, 1f),
    PuppyShape("M32 17 C29.5 22 30 26.5 32 29 C34 26.5 34.5 22 32 17 Z", Color(0xFFF2C468), null, 0f, 1f),
    PuppyShape("M20.5 41 a11.5 8.5 0 1 0 23 0 a11.5 8.5 0 1 0 -23 0 Z", Color(0xFFFBE8C4), null, 0f, 1f),
    PuppyShape("M19 40.5 a3 2 0 1 0 6 0 a3 2 0 1 0 -6 0 Z", Color(0xFFF4A08A), null, 0f, 0.55f),
    PuppyShape("M39 40.5 a3 2 0 1 0 6 0 a3 2 0 1 0 -6 0 Z", Color(0xFFF4A08A), null, 0f, 0.55f),
    PuppyShape("M29.2 45.5 C29 51.5 35 51.5 34.8 45.5 Z", Color(0xFFF0707F), null, 0f, 1f),
    PuppyShape("M32 39.8 L32 44 M32 44 C30.2 46.8 26.8 46.4 26.3 44.2 M32 44 C33.8 46.8 37.2 46.4 37.7 44.2", null, Color(0xFF2B1B12), 1.4f, 1f),
    PuppyShape("M27.8 36.8 a4.2 3.1 0 1 0 8.4 0 a4.2 3.1 0 1 0 -8.4 0 Z", Color(0xFF2B1B12), null, 0f, 1f),
    PuppyShape("M30.4 35.6 a1.3 0.8 0 1 0 2.6 0 a1.3 0.8 0 1 0 -2.6 0 Z", Color(0xFFFFFFFF), null, 0f, 0.6f),
    PuppyShape("M21.2 29.5 a3.3 3.3 0 1 0 6.6 0 a3.3 3.3 0 1 0 -6.6 0 Z", Color(0xFF2B1B12), null, 0f, 1f),
    PuppyShape("M36.2 29.5 a3.3 3.3 0 1 0 6.6 0 a3.3 3.3 0 1 0 -6.6 0 Z", Color(0xFF2B1B12), null, 0f, 1f),
    PuppyShape("M24.5 28.4 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z", Color(0xFFFFFFFF), null, 0f, 1f),
    PuppyShape("M39.5 28.4 a1.1 1.1 0 1 0 2.2 0 a1.1 1.1 0 1 0 -2.2 0 Z", Color(0xFFFFFFFF), null, 0f, 1f),
)

@Composable
fun BrandMark(size: androidx.compose.ui.unit.Dp = 72.dp) {
    val paths = remember { puppy.map { androidx.compose.ui.graphics.vector.PathParser().parsePathString(it.d).toPath() } }
    androidx.compose.foundation.Canvas(Modifier.size(size).semantics { contentDescription = "Pupper, a golden retriever puppy" }) {
        val k = this.size.minDimension / 64f
        androidx.compose.ui.graphics.drawscope.scale(k, k, pivot = androidx.compose.ui.geometry.Offset.Zero) {
            puppy.forEachIndexed { i, sh ->
                sh.fill?.let { drawPath(paths[i], it, alpha = sh.alpha) }
                sh.stroke?.let {
                    drawPath(paths[i], it, style = androidx.compose.ui.graphics.drawscope.Stroke(sh.width,
                        cap = androidx.compose.ui.graphics.StrokeCap.Round, join = androidx.compose.ui.graphics.StrokeJoin.Round))
                }
            }
        }
    }
}

@Composable
fun AuthScreen() {
    var mode by remember { mutableStateOf("in") }
    var name by remember { mutableStateOf("") }; var email by remember { mutableStateOf("") }; var password by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }; var info by remember { mutableStateOf<String?>(null) }; var busy by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()

    fun submit() {
        error = null; info = null; busy = true
        scope.launch {
            try {
                when (mode) {
                    "up" -> Repo.register(name, email, password)
                    "in" -> Repo.login(email, password)
                    else -> { Repo.resetPassword(email); info = "If an account exists for this email, a reset link is on its way." }
                }
            } catch (e: Exception) { error = Repo.authMessage(e) } finally { busy = false }
        }
    }

    Column(
        Modifier.fillMaxSize().imePadding().verticalScroll(rememberScrollState()).padding(28.dp),
        verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        BrandMark(80.dp)
        Text("Pupper", style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold, color = Palette.BrownDeep, modifier = Modifier.padding(top = 12.dp))
        Text(if (mode == "reset") "Enter your email and we will send a reset link." else "Connect with the people who matter.",
            color = Palette.Muted, modifier = Modifier.padding(top = 4.dp, bottom = 20.dp))
        if (mode == "up") OutlinedTextField(name, { name = it.take(60) }, label = { Text("Your name") }, singleLine = true, modifier = Modifier.fillMaxWidth())
        OutlinedTextField(email, { email = it }, label = { Text("Email") }, singleLine = true, modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email))
        if (mode != "reset") OutlinedTextField(password, { password = it }, label = { Text("Password") }, singleLine = true, modifier = Modifier.fillMaxWidth().padding(top = 8.dp),
            visualTransformation = PasswordVisualTransformation(), keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password))
        error?.let { Text(it, color = Palette.Danger, modifier = Modifier.padding(top = 10.dp)) }
        info?.let { Text(it, color = Palette.BrownDeep, modifier = Modifier.padding(top = 10.dp)) }
        PrimaryButton(if (busy) "Please wait…" else when (mode) { "in" -> "Sign in"; "up" -> "Create account"; else -> "Send reset link" },
            enabled = !busy && email.isNotBlank(), modifier = Modifier.fillMaxWidth().padding(top = 16.dp)) { submit() }
        if (mode == "in") OutlinedButton({ mode = "up"; error = null }, Modifier.fillMaxWidth().padding(top = 8.dp)) { Text("Create account") }
        if (mode == "in") TextButton({ mode = "reset"; error = null }) { Text("Forgot password?") }
        else TextButton({ mode = "in"; error = null; info = null }) { Text("Back to sign in") }
    }
}

@Composable
fun SetupNeeded() {
    Column(Modifier.fillMaxSize().padding(28.dp), verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally) {
        BrandMark(80.dp)
        Text("Almost there", style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold, modifier = Modifier.padding(top = 12.dp))
        Text("This build has no Firebase settings. Add them to android/local.properties (see README) and rebuild.", color = Palette.Muted, modifier = Modifier.padding(top = 8.dp))
    }
}
