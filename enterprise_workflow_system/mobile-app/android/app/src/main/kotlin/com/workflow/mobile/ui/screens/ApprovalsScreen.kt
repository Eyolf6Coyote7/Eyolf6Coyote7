package com.workflow.mobile.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.workflow.mobile.data.MockData
import com.workflow.mobile.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ApprovalsScreen(onBack: () -> Unit) {
    var selectedTab by remember { mutableIntStateOf(0) }
    val tabs = listOf("All (8)", "Pending (5)", "Urgent (2)")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Approval Queue", fontWeight = FontWeight.SemiBold, fontSize = 16.sp, letterSpacing = (-0.4).sp) },
                navigationIcon = { IconButton(onClick = {}) { Icon(Icons.Default.Menu, contentDescription = "Menu") } },
                actions = { IconButton(onClick = {}) { Icon(Icons.Default.FilterList, contentDescription = "Filter") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.White.copy(alpha = 0.8f))
            )
        },
        bottomBar = {
            NavigationBar(containerColor = Color.White.copy(alpha = 0.8f)) {
                NavigationBarItem(selected = false, onClick = onBack, icon = { Icon(Icons.Default.Home, contentDescription = null) }, label = { Text("Dashboard", fontSize = 10.sp) })
                NavigationBarItem(selected = true, onClick = {}, icon = {
                    BadgedBox(badge = { Badge(containerColor = DangerDark) { Text("8", color = Color.White, fontSize = 9.sp) } }) { Icon(Icons.Default.Checklist, contentDescription = null) }
                }, label = { Text("Queue", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = ActiveBlue) })
                NavigationBarItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.History, contentDescription = null) }, label = { Text("History", fontSize = 10.sp) })
                NavigationBarItem(selected = false, onClick = {}, icon = { Icon(Icons.Default.Person, contentDescription = null) }, label = { Text("Account", fontSize = 10.sp) })
            }
        }
    ) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding).background(BgPage)) {
            // Segmented Control
            Surface(color = Color.White, shadowElevation = 1.dp) {
                Row(
                    modifier = Modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp).background(BgSurface, RoundedCornerShape(8.dp)).padding(4.dp),
                    horizontalArrangement = Arrangement.spacedBy(0.dp)
                ) {
                    tabs.forEachIndexed { i, tab ->
                        val isSelected = selectedTab == i
                        Surface(
                            modifier = Modifier.weight(1f).height(32.dp),
                            shape = RoundedCornerShape(4.dp),
                            color = if (isSelected) PrimaryDark else Color.Transparent,
                            onClick = { selectedTab = i }
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Text(tab, fontSize = 13.sp, fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Medium, color = if (isSelected) Color.White else TextSecondary)
                            }
                        }
                    }
                }
            }

            // Card List
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(MockData.approvals) { approval ->
                    val isUrgent = approval.priority == "Urgent"
                    Card(
                        shape = RoundedCornerShape(8.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = if (isUrgent) 4.dp else 2.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(modifier = Modifier.fillMaxWidth()) {
                            if (isUrgent) {
                                Box(modifier = Modifier.width(4.dp).fillMaxHeight().background(Danger))
                            }
                            Column(modifier = Modifier.padding(16.dp).fillMaxWidth()) {
                                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                                    Text("#${approval.id}", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = PrimaryDark)
                                    Text(approval.date, fontSize = 12.sp, color = TextMuted)
                                }
                                Spacer(modifier = Modifier.height(4.dp))
                                Text(approval.title, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                                Spacer(modifier = Modifier.height(4.dp))
                                Text("${approval.requester} · ${approval.department}", fontSize = 13.sp, color = TextSecondary)
                                Spacer(modifier = Modifier.height(8.dp))
                                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
                                    Surface(shape = RoundedCornerShape(12.dp), color = when (approval.priority) {
                                        "Urgent" -> Color(0xFFFEF0F0)
                                        "High" -> Color(0xFFFDF6EC)
                                        "Medium" -> Color(0xFFE6F1FC)
                                        else -> Color(0xFFE6E8EB)
                                    }) {
                                        Text(
                                            approval.priority,
                                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp),
                                            fontSize = 11.sp, fontWeight = FontWeight.Bold,
                                            color = when (approval.priority) {
                                                "Urgent" -> Danger
                                                "High" -> Warning
                                                "Medium" -> PrimaryDark
                                                else -> TextSecondary
                                            }
                                        )
                                    }
                                    if (approval.amount != "—") {
                                        Text(approval.amount, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
