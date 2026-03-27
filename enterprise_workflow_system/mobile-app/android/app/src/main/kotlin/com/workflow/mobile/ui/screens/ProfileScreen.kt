package com.workflow.mobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.workflow.mobile.data.MockData
import com.workflow.mobile.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(onBack: () -> Unit, onLogout: () -> Unit) {
    var twoFactorEnabled by remember { mutableStateOf(true) }
    var pushEnabled by remember { mutableStateOf(true) }
    var smsEnabled by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Profile", fontWeight = FontWeight.Bold, fontSize = 18.sp) },
                navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = ActiveBlue) } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White.copy(alpha = 0.8f))
            )
        },
        bottomBar = {
            NavigationBar(containerColor = Color.White.copy(alpha = 0.8f)) {
                NavigationBarItem(selected = false, onClick = onBack, icon = { Icon(Icons.Default.Checklist, contentDescription = null) }, label = { Text("Workflow", fontSize = 10.sp) })
                NavigationBarItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.Description, contentDescription = null) }, label = { Text("Tasks", fontSize = 10.sp) })
                NavigationBarItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.Notifications, contentDescription = null) }, label = { Text("Inbox", fontSize = 10.sp) })
                NavigationBarItem(selected = true, onClick = {}, icon = { Icon(Icons.Default.Person, contentDescription = null) }, label = { Text("Profile", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = ActiveBlue) })
            }
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier.fillMaxSize().padding(padding).background(BgPage),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            // Profile Header
            item {
                Surface(color = Color.White) {
                    Column(modifier = Modifier.fillMaxWidth().padding(32.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                        Box(modifier = Modifier.size(72.dp).clip(CircleShape).background(Color(0xFFE6E8EF)), contentAlignment = Alignment.Center) {
                            Icon(Icons.Default.Person, contentDescription = null, modifier = Modifier.size(32.dp), tint = TextMuted)
                        }
                        Spacer(modifier = Modifier.height(16.dp))
                        Text(MockData.userName, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                        Text("${MockData.userRole} · ${MockData.userDepartment}", fontSize = 14.sp, fontWeight = FontWeight.Medium, color = TextSecondary)
                        Spacer(modifier = Modifier.height(3.dp))
                        Text(MockData.userEmail, fontSize = 13.sp, color = Color(0xFFC0C7D4))
                    }
                }
            }

            // Account Section
            item {
                SectionGroup("Account") {
                    SettingsRow(Icons.Default.Person, "Personal Information") {}
                    HorizontalDivider(color = BorderLight)
                    SettingsRow(Icons.Default.Lock, "Change Password") {}
                    HorizontalDivider(color = BorderLight)
                    Row(modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp)) {
                        Text("Employee ID: EMP-001", fontSize = 15.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
                    }
                }
            }

            // Security Section
            item {
                SectionGroup("Security") {
                    Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Shield, contentDescription = null, tint = Success, modifier = Modifier.size(16.dp))
                            Text("Two-Factor Authentication", fontSize = 15.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
                        }
                        Switch(checked = twoFactorEnabled, onCheckedChange = { twoFactorEnabled = it }, colors = SwitchDefaults.colors(checkedTrackColor = Success))
                    }
                    HorizontalDivider(color = BorderLight)
                    SettingsRow(Icons.Default.Key, "Backup Codes", subtitle = "5 codes remaining") {}
                    HorizontalDivider(color = BorderLight)
                    Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
                            Icon(Icons.Default.Devices, contentDescription = null, tint = PrimaryDark, modifier = Modifier.size(20.dp))
                            Text("Active Sessions", fontSize = 15.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
                        }
                        Badge(containerColor = PrimaryDark) { Text("2", color = Color.White, fontSize = 10.sp) }
                    }
                }
            }

            // Notifications Section
            item {
                SectionGroup("Notifications") {
                    ToggleRow("Push Notifications", pushEnabled) { pushEnabled = it }
                    HorizontalDivider(color = BorderLight)
                    ToggleRow("SMS Alerts", smsEnabled) { smsEnabled = it }
                    HorizontalDivider(color = BorderLight)
                    SettingsRow(Icons.Default.DoNotDisturb, "Quiet Hours", subtitle = "22:00 — 07:00") {}
                }
            }

            // About Section
            item {
                SectionGroup("About") {
                    Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 12.dp), horizontalArrangement = Arrangement.SpaceBetween) {
                        Text("App Version", fontSize = 15.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
                        Text("1.0.0 (Build 42)", fontSize = 14.sp, color = Color(0xFFC0C7D4))
                    }
                    HorizontalDivider(color = BorderLight)
                    SettingsRow(Icons.Default.Description, "Terms of Service") {}
                    HorizontalDivider(color = BorderLight)
                    SettingsRow(Icons.Default.Security, "Privacy Policy") {}
                    HorizontalDivider(color = BorderLight)
                    SettingsRow(Icons.Default.HelpOutline, "Help & Support") {}
                }
            }

            // Logout
            item {
                Surface(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp),
                    shape = RoundedCornerShape(12.dp),
                    color = Color.White,
                    shadowElevation = 1.dp,
                    onClick = onLogout
                ) {
                    Box(modifier = Modifier.fillMaxWidth().padding(vertical = 14.dp), contentAlignment = Alignment.Center) {
                        Text("Log Out", fontWeight = FontWeight.SemiBold, fontSize = 16.sp, color = Danger)
                    }
                }
                Spacer(modifier = Modifier.height(32.dp))
            }
        }
    }
}

@Composable
private fun SectionGroup(title: String, content: @Composable ColumnScope.() -> Unit) {
    Column(modifier = Modifier.padding(horizontal = 16.dp)) {
        Text(title, modifier = Modifier.padding(start = 16.dp, bottom = 8.dp), fontSize = 12.sp, fontWeight = FontWeight.Bold, color = TextSecondary.copy(alpha = 0.6f), letterSpacing = 0.6.sp)
        Surface(shape = RoundedCornerShape(12.dp), color = Color.White, shadowElevation = 1.dp) {
            Column(modifier = Modifier.fillMaxWidth(), content = content)
        }
    }
}

@Composable
private fun SettingsRow(icon: androidx.compose.ui.graphics.vector.ImageVector, label: String, subtitle: String? = null, onClick: () -> Unit) {
    Surface(onClick = onClick) {
        Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = if (subtitle != null) 8.dp else 12.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(icon, contentDescription = null, tint = PrimaryDark, modifier = Modifier.size(16.dp))
                Column {
                    Text(label, fontSize = 15.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
                    if (subtitle != null) Text(subtitle, fontSize = 12.sp, color = Color(0xFFC0C7D4))
                }
            }
            Icon(Icons.Default.ChevronRight, contentDescription = null, tint = Color(0xFFC0C7D4), modifier = Modifier.size(10.dp))
        }
    }
}

@Composable
private fun ToggleRow(label: String, checked: Boolean, onCheckedChange: (Boolean) -> Unit) {
    Row(modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 12.dp), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.Notifications, contentDescription = null, tint = PrimaryDark, modifier = Modifier.size(16.dp))
            Text(label, fontSize = 15.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
        }
        Switch(checked = checked, onCheckedChange = onCheckedChange, colors = SwitchDefaults.colors(checkedTrackColor = PrimaryDark))
    }
}
